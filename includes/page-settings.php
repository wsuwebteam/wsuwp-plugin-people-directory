<?php namespace WSUWP\Plugin\People_Directory;

class Page_Settings {

	private static $page_slug = 'people_directory';

	private static $options_group = 'people_directory_settings';

	public static function add_settings_page() {

		add_options_page(
			'People Directory',
			'People Directory',
			'manage_options',
			self::$page_slug,
			__CLASS__ . '::people_directory_content'
		);

	}


	public static function register_settings() {

		// create section
		add_settings_section(
			self::$options_group,
			'',
			'',
			self::$page_slug
		);

		// register fields
		register_setting( self::$options_group, 'wsu_people_directory_university_organization' );
		register_setting( self::$options_group, 'wsu_people_directory_enable_taxonomy_updates' );
		register_setting( self::$options_group, 'wsu_people_directory_enable_profile_updates' );

		// add fields
		add_settings_field(
			'wsu_people_directory_university_organization',
			'University Organization Slug',
			__CLASS__ . '::org_select',
			self::$page_slug,
			self::$options_group,
			array(
				'id'          => 'university-org-select',
				'label_for'   => 'wsu_people_directory_university_organization',
				'class'       => '',
				'description' => 'Choose your site\'s University Organization slug. Is your organization missing? <a href="#" id="university-org-create-toggle">Create New Organization</a>.',
			)
		);

		add_settings_field(
			'wsu_people_directory_enable_taxonomy_updates',
			'Enable Taxonomy Updates',
			__CLASS__ . '::input_checkbox',
			self::$page_slug,
			self::$options_group,
			array(
				'id'          => 'taxonomy-updates-input',
				'label'       => 'Enable keeping taxonomy names up to date with WSU People Directory information',
				'label_for'   => 'wsu_people_directory_enable_taxonomy_updates',
				'class'       => '',
				'description' => '',
			)
		);

		add_settings_field(
			'wsu_people_directory_enable_profile_updates',
			'Enable Profile Updates',
			__CLASS__ . '::input_checkbox',
			self::$page_slug,
			self::$options_group,
			array(
				'id'          => 'profile-updates-input',
				'label'       => 'Enable keeping profiles up to date with WSU People Directory information',
				'label_for'   => 'wsu_people_directory_enable_profile_updates',
				'class'       => '',
				'description' => '',
			)
		);

	}


	public static function input_checkbox( $args ) {

		$option = get_option( $args['label_for'], 'true' );

		$html  = '<input type="checkbox" id="' . esc_attr( $args['id'] ) . '" name="' . esc_html( $args['label_for'] ) . '" value="true" ' . ( $option === 'true' ? 'checked' : '' ) . '/>';
		$html .= '<label for="' . esc_attr( $args['id'] ) . '">' . esc_attr( $args['label'] ) . '</label>';
		$html .= '<p class="description">' . $args['description'] . '</p>';

		echo $html;

	}


	public static function org_select( $args ) {

		echo '<select id="' . esc_attr( $args['id'] ) . '" class="' . esc_attr( $args['class'] ) . '" name="' . esc_html( $args['label_for'] ) . '" data-value="' . esc_html( get_option( $args['label_for'] ) ) . '"><option value=""></option></select>';
		echo '<p class="description">' . $args['description'] . '</p>';

		?>
		<div id="university-org-create-form" class="form-wrap">
			<h2>Add New Organization</h2>
			<div class="form-field form-required term-name-wrap">
				<label for="tag-name">Name *</label>
				<input name="tag-name" id="tag-name" type="text" value="" size="40" aria-required="true">
				<p>The name is how it appears on your site.</p>
			</div>
			<div class="form-field term-slug-wrap">
				<label for="tag-slug">Slug</label>
				<input name="slug" id="tag-slug" type="text" value="" size="40">
				<p>The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens.</p>
			</div>
			<div class="form-field term-parent-wrap">
				<label for="parent">Parent Category</label>
				<select name="parent" id="parent" class="postform"></select>
				<p>Assign a parent term to create a hierarchy. The term Jazz, for example, would be the parent of Bebop and Big Band.</p>
			</div>
			<div class="form-field term-description-wrap">
				<label for="tag-description">Description</label>
				<textarea name="description" id="tag-description" rows="5" cols="40"></textarea>
				<p>The description is not prominent by default; however, some themes may show it.</p>
			</div>
			<p class="submit">
				<button type="button" name="submit" id="submit" class="button button-primary">Add New Organization</button>		<span class="spinner"></span>
			</p>
		</div>
		<?php

	}


	public static function enqueue_assets( $hook ) {

		if ( 'settings_page_people_directory' === $hook ) {
			wp_enqueue_script( 'wsuwp-plugin-people-directory-settings-page-scripts' );
			wp_enqueue_style( 'wsuwp-plugin-people-directory-settings-page-styles' );

			$script  = 'const SETTINGS_PAGE_DATA = {';
			$script .= 'siteUrl: "' . site_url() . '",';
			$script .= '};';

			wp_add_inline_script( 'wsuwp-plugin-people-directory-settings-page-scripts', $script, 'before' );
		}

	}


	private static function get_existing_profile_nids() {

		$nids = array();

		$args = array(
			'posts_per_page' => -1,
			'post_type'      => Post_Type_Profile::get( 'post_type' ),
			'meta_query'     => array(
				array(
					'key'     => '_wsuwp_nid',
					'compare' => 'EXISTS',
				),
				array(
					'key'     => '_wsuwp_nid',
					'value'   => '',
					'compare' => '!=',
				),
			),
		);

		$query = new \WP_Query( $args );

		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();
				$id = get_the_ID();

				$nids[] = get_post_meta( $id, '_wsuwp_nid', true );
			}
		}

		natcasesort( $nids );

		return $nids;

	}


	public static function people_directory_content() {

		// check user capabilities
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$selected_university_org = get_option( 'wsu_people_directory_university_organization' );
		?>
		<div class="wrap">
			<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
			<div class="notice hidden">
				<p class="message"></p>
			</div>

			<h2>Settings</h2>
			<form method="post" action="options.php">
				<?php
					settings_fields( self::$options_group );
					do_settings_sections( self::$page_slug );
				?>

				<?php
				submit_button();
				?>
			</form>

			<?php

			if ( ! empty( $selected_university_org ) ) {
				?>
			<hr>

			<h2>Import Controls</h2>
			<table class="form-table" role="presentation">
				<tbody>
					<tr>
						<th scope="row"><label for="profile-nids">Import Profiles</label></th>
						<td>
							<div class="form-field term-description-wrap">
									<label for="profile-nids">List profile nids to import. One per line.</label>
									<textarea id="profile-nids" rows="10" placeholder="butch.cougar" <?php echo empty( $selected_university_org ) ? 'disabled' : ''; ?>></textarea>
									<div class="wsu-unpublish-profiles__container">
										<label>
											<input type="checkbox" id="unpublish-profiles" value="true">
											Unpublish profiles not in this list. This will only apply to profiles that were previously imported.
										</label>
									</div>
								</div>
								<p class="submit wsu-import-submit__container">
									<button type="button" id="import-profiles-btn" class="button button-primary">Import Profiles List</button>		<span class="spinner"></span>
								</p>
							</div>
						</td>
					</tr>
					<tr>
						<th scope="row"><label for="profile-nids">Existing Profiles</label></th>
						<td>
							<div class="form-field term-description-wrap">
								<?php
								if ( isset( $_REQUEST['list-profiles'] ) && $_REQUEST['list-profiles'] === 'true' ) {
									$nids        = self::get_existing_profile_nids();
									$nids_output = '';

									if ( version_compare( PHP_VERSION, '7.4.0' ) >= 0 ) {
										$nids_output = implode( '<br/>', $nids );
									} else {
										$nids_output = implode( $nids, '<br/>' );
									}

									echo '<div class="wsuwp-people-directory-settings-page__existing-profiles">' . $nids_output . '</div>';
								} else {
									echo '<button type="button" id="list-profiles-btn" class="button button-secondary">Display list of existing profile nids</button>		<span class="spinner"></span>';
								}
								?>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
				<?php
			}
			?>
		</div>
		<?php

	}


	public static function init() {

		add_action( 'admin_init', __CLASS__ . '::register_settings' );
		add_action( 'admin_menu', __CLASS__ . '::add_settings_page' );
		add_action( 'admin_enqueue_scripts', __CLASS__ . '::enqueue_assets', 10, 1 );

	}

}

Page_Settings::init();
