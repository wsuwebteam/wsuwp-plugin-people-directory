<?php namespace WSUWP\Plugin\People_Directory;

class Post_Type_Profile {

	private static $slug = 'wsuwp_people_profile';

	private static $attributes = array(
		'labels'        => array(
			'name'               => 'Profiles',
			'singular_name'      => 'Profile',
			'all_items'          => 'All Profiles',
			'view_item'          => 'View Profile',
			'add_new_item'       => 'Add New Profile',
			'add_new'            => 'Add New',
			'edit_item'          => 'Edit Profile',
			'update_item'        => 'Update Profile',
			'search_items'       => 'Search Profiles',
			'not_found'          => 'Not found',
			'not_found_in_trash' => 'Not found in Trash',
		),
		'description'   => 'WSU people profiles directory.',
		'public'        => true,
		'hierarchical'  => false,
		'show_in_rest'  => true,
		'menu_position' => 6,
		'menu_icon'     => 'dashicons-groups',
		'supports'      => array(
			'title',
			'editor',
			'revisions',
			'custom-fields',
		),
		'taxonomies'    => array(
			'category',
			'post_tag',
			'wsuwp_university_location',
			'wsuwp_university_org',
			'classification',
			'wsuwp_focus_area',
		),
		'template'      => array(
			array(
				'wsuwp/people-directory-profile',
				array(),
			),
		),
		'template_lock' => 'insert',
		'rewrite'       => array(
			'slug'       => 'profile',
			'with_front' => true,
		),
	);


	public static function get( $name ) {

		switch ( $name ) {

			case 'post_type':
				return self::$slug;
			default:
				return '';

		}

	}


	public static function register_post_type() {

		register_post_type( self::$slug, self::$attributes );

		// register meta fields.
		$meta_fields = array(
			array(
				'name' => '_wsuwp_nid',
				'type' => 'string',
			),
			array(
				'name' => 'wsuwp_display_name',
				'type' => 'string',
			),
			array(
				'name' => '_wsuwp_fallback_display_name',
				'type' => 'string',
			),
			array(
				'name' => 'wsuwp_first_name',
				'type' => 'string',
			),
			array(
				'name' => '_wsuwp_fallback_first_name',
				'type' => 'string',
			),
			array(
				'name' => 'wsuwp_middle_name',
				'type' => 'string',
			),
			array(
				'name' => '_wsuwp_fallback_middle_name',
				'type' => 'string',
			),
			array(
				'name' => 'wsuwp_last_name',
				'type' => 'string',
			),
			array(
				'name' => '_wsuwp_fallback_last_name',
				'type' => 'string',
			),
			array(
				'name'         => 'wsuwp_title',
				'type'         => 'array',
				'show_in_rest' => array(
					'schema' => array(
						'type'  => 'array',
						'items' => array(
							'type' => 'string',
						),
					),
				),
			),
			array(
				'name'         => '_wsuwp_fallback_title',
				'type'         => 'array',
				'show_in_rest' => array(
					'schema' => array(
						'type'  => 'array',
						'items' => array(
							'type' => 'string',
						),
					),
				),
			),
			array(
				'name' => 'wsuwp_office',
				'type' => 'string',
			),
			array(
				'name' => '_wsuwp_fallback_office',
				'type' => 'string',
			),
			array(
				'name' => 'wsuwp_email',
				'type' => 'string',
			),
			array(
				'name' => '_wsuwp_fallback_email',
				'type' => 'string',
			),
			array(
				'name' => 'wsuwp_address',
				'type' => 'string',
			),
			array(
				'name' => '_wsuwp_fallback_address',
				'type' => 'string',
			),
			array(
				'name' => 'wsuwp_phone',
				'type' => 'string',
			),
			array(
				'name' => '_wsuwp_fallback_phone',
				'type' => 'string',
			),
			array(
				'name' => 'wsuwp_phone_ext',
				'type' => 'string',
			),
			array(
				'name' => '_wsuwp_fallback_phone_ext',
				'type' => 'string',
			),
			array(
				'name'         => 'wsuwp_degree',
				'type'         => 'array',
				'show_in_rest' => array(
					'schema' => array(
						'type'  => 'array',
						'items' => array(
							'type' => 'string',
						),
					),
				),
			),
			array(
				'name'         => '_wsuwp_fallback_degree',
				'type'         => 'array',
				'show_in_rest' => array(
					'schema' => array(
						'type'  => 'array',
						'items' => array(
							'type' => 'string',
						),
					),
				),
			),
			array(
				'name' => 'wsuwp_website',
				'type' => 'string',
			),
			array(
				'name' => '_wsuwp_fallback_website',
				'type' => 'string',
			),

			array(
				'name'         => '_wsuwp_fallback_classification',
				'type'         => 'array',
				'show_in_rest' => array(
					'schema' => array(
						'type'  => 'array',
						'items' => array(
							'type' => 'string',
						),
					),
				),
			),
			array(
				'name'         => '_wsuwp_fallback_category',
				'type'         => 'array',
				'show_in_rest' => array(
					'schema' => array(
						'type'  => 'array',
						'items' => array(
							'type' => 'string',
						),
					),
				),
			),
			array(
				'name'         => '_wsuwp_fallback_location',
				'type'         => 'array',
				'show_in_rest' => array(
					'schema' => array(
						'type'  => 'array',
						'items' => array(
							'type' => 'string',
						),
					),
				),
			),
			array(
				'name'         => '_wsuwp_fallback_organization',
				'type'         => 'array',
				'show_in_rest' => array(
					'schema' => array(
						'type'  => 'array',
						'items' => array(
							'type' => 'string',
						),
					),
				),
			),
			array(
				'name'         => '_wsuwp_fallback_tag',
				'type'         => 'array',
				'show_in_rest' => array(
					'schema' => array(
						'type'  => 'array',
						'items' => array(
							'type' => 'string',
						),
					),
				),
			),
			array(
				'name'         => '_wsuwp_fallback_focus',
				'type'         => 'array',
				'show_in_rest' => array(
					'schema' => array(
						'type'  => 'array',
						'items' => array(
							'type' => 'string',
						),
					),
				),
			),

			array(
				'name' => '_wsuwp_fallback_bio',
				'type' => 'string',
			),

			array(
				'name' => 'wsuwp_photo',
				'type' => 'integer',
			),
			array(
				'name'         => '_wsuwp_fallback_photo_sizes',
				'type'         => 'object',
				'show_in_rest' => array(
					'schema' => array(
						'type'       => 'object',
						'properties' => array(
							'thumbnail'    => array(
								'type' => 'string',
							),
							'medium'       => array(
								'type' => 'string',
							),
							'medium_large' => array(
								'type' => 'string',
							),
							'large'        => array(
								'type' => 'string',
							),
							'full'         => array(
								'type' => 'string',
							),
						),
					),
				),
			),
			array(
				'name' => '_wsuwp_fallback_photo_srcset',
				'type' => 'string',
			),
			array(
				'name' => '_wsuwp_fallback_photo',
				'type' => 'string',
			),
		);

		foreach ( $meta_fields as $meta_field ) {
			register_post_meta(
				self::$slug,
				$meta_field['name'],
				array(
					'type'          => $meta_field['type'],
					'show_in_rest'  => isset( $meta_field['show_in_rest'] ) ? $meta_field['show_in_rest'] : true,
					'single'        => true,
					'auth_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
				)
			);
		}

	}


	public static function handle_post_status_transititon( $new_status, $old_status, $post ) {

		$action = '';
		$org    = esc_html( get_option( 'wsu_people_directory_university_organization' ) );

		if ( 'publish' === $new_status && 'publish' !== $old_status ) {
			$action = 'add';
		}

		if ( 'publish' !== $new_status && 'publish' === $old_status ) {
			$action = 'remove';
		}

		if ( $action && $org ) {

			$nid = get_post_meta( $post->ID, '_wsuwp_nid', true );
			$url = PEOPLE_API_DOMAIN . '/wp-json/peopleapi/v1/sync-organization';

			$response = wp_remote_post(
				$url,
				array(
					'body' => array(
						'nid'    => $nid,
						'org'    => $org,
						'action' => $action,
					),
				)
			);

		}

	}


	public static function profile_import_control( $hook ) {

		if ( 'edit.php' === $hook && 'wsuwp_people_profile' === get_current_screen()->post_type ) {
			wp_enqueue_script( 'wsuwp-plugin-people-directory-edit-profiles-page-scripts' );
			wp_enqueue_style( 'wsuwp-plugin-people-directory-edit-profiles-page-styles' );
			wp_enqueue_script( 'thickbox' );
			wp_enqueue_style( 'thickbox' );

			$script  = 'const editProfilePageData = {';
			$script .= 'universityOrganization: "' . esc_html( get_option( 'wsu_people_directory_university_organization' ) ) . '",';
			$script .= '};';

			wp_add_inline_script( 'wsuwp-plugin-people-directory-edit-profiles-page-scripts', $script, 'before' );
		}

	}


	public static function replace_title_on_render( $title ) {

		if ( in_the_loop() && ! is_admin() && ! wp_doing_ajax() ) {

			global $post;

			$display_name = get_post_meta( $post->ID, 'wsuwp_display_name', true );
			$title        = empty( $display_name ) ? get_post_meta( $post->ID, '_wsuwp_fallback_display_name', true ) : $display_name;

		}

		return $title;

	}


	public static function render_content_for_rest_requests( $content ) {

		global $post;

		if ( defined( 'REST_REQUEST' ) && $post->post_type === self::$slug ) {

			$blocks = parse_blocks( $content );

			$profile_block = current(
				array_filter(
					$blocks,
					function( $block ) {
						return $block['blockName'] === 'wsuwp/people-directory-profile';
					}
				)
			);

			if ( true === $profile_block['attrs']['hasCustomBio'] ) {

				$html = '';

				foreach ( $profile_block['innerBlocks'] as $block ) {
					$html .= render_block( $block );
				}

				return $html;
			}

			$fallback_bio = get_post_meta( $post->ID, '_wsuwp_fallback_bio', true );

			return $fallback_bio;
		}

		return $content;

	}


	public static function init() {

		add_action( 'init', array( __CLASS__, 'register_post_type' ), 11 );
		add_action( 'transition_post_status', array( __CLASS__, 'handle_post_status_transititon' ), 10, 3 );
		add_action( 'admin_enqueue_scripts', array( __CLASS__, 'profile_import_control' ) );

		add_filter( 'the_title', __CLASS__ . '::replace_title_on_render', 100 );
		add_filter( 'the_content', __CLASS__ . '::render_content_for_rest_requests', 99 );

	}

}

Post_Type_Profile::init();
