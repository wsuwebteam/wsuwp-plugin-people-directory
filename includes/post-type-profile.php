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

			$script  = 'const EDIT_PROFILE_PAGE_DATA = {';
			$script .= 'siteUrl: "' . site_url() . '",';
			$script .= 'universityOrganization: "' . esc_html( get_option( 'wsu_people_directory_university_organization' ) ) . '",';
			$script .= '};';

			wp_add_inline_script( 'wsuwp-plugin-people-directory-edit-profiles-page-scripts', $script, 'before' );
		}

	}


	public static function replace_title_on_render( $title ) {

		if ( in_the_loop() && ! is_admin() && ! wp_doing_ajax() ) {

			if ( get_post_type() === self::$slug ) {

				$post_id = get_the_ID();

				$display_name = get_post_meta( $post_id, 'wsuwp_display_name', true );
				$title        = empty( $display_name ) ? get_post_meta( $post_id, '_wsuwp_fallback_display_name', true ) : $display_name;

			}
		}

		return $title;

	}


	private static function get_custom_bio_from_content( $content ) {

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

			return array(
				'hasCustomBio' => true,
				'html'         => $html,
			);
		}

		return array(
			'hasCustomBio' => false,
			'html'         => '',
		);

	}


	public static function render_content_for_rest_requests( $content ) {

		global $post;

		if ( defined( 'REST_REQUEST' ) && $post->post_type === self::$slug ) {
			$custom_bio = self::get_custom_bio_from_content( $content );

			if ( true === $custom_bio['hasCustomBio'] ) {
				return $custom_bio['html'];
			}

			// fallback to fallback bio
			$fallback_bio = get_post_meta( $post->ID, '_wsuwp_fallback_bio', true );

			return $fallback_bio;
		}

		return $content;

	}


	public static function manage_columns( $columns ) {

		$custom_col_order = array(
			'cb'                            => $columns['cb'],
			'title'                         => $columns['title'],
			'nid'                           => __( 'nid', 'textdomain' ),
			'has_bio'                       => __( 'Has Bio', 'textdomain' ),
			'categories'                    => $columns['categories'],
			'tags'                          => $columns['tags'],
			'taxonomy-wsuwp_university_org' => $columns['taxonomy-wsuwp_university_org'],
			'date'                          => $columns['date'],
			'Modified'                      => $columns['Modified'],
		);

		return $custom_col_order;

	}


	public static function manage_custom_column( $column, $post_id ) {

		switch ( $column ) {

			case 'nid':
				echo get_post_meta( $post_id, '_wsuwp_nid', true );
				break;

			case 'has_bio':
				$post_content = apply_filters( 'the_content', get_post_field( 'post_content', $post_id ) );
				$custom_bio   = self::get_custom_bio_from_content( $post_content );
				$fallback_bio = get_post_meta( $post_id, '_wsuwp_fallback_bio', true );

				echo ( ( true === $custom_bio['hasCustomBio'] && ! empty( $custom_bio['html'] ) )
					|| ( false === $custom_bio['hasCustomBio'] && ! empty( $fallback_bio ) ) ) ? '<i class="dashicons-before dashicons-yes-alt wsuwp-profiles-page__color--success"></i>' : '<i class="dashicons-before dashicons-dismiss wsuwp-profiles-page__color--failure"></i>';

				break;

		}

	}


	public static function manage_sortable_columns( $columns ) {

		// Reference if we need to make has_bio sortable
		// https://wordpress.stackexchange.com/a/293403

		$columns['nid'] = 'nid';
		return $columns;

	}


	public static function pre_get_posts( $query ) {

		if ( ! is_admin() || ! $query->is_main_query() ) {
			return;
		}

		if ( 'nid' === $query->get( 'orderby' ) ) {
			$query->set( 'orderby', 'meta_value' );
			$query->set( 'meta_key', '_wsuwp_nid' );
			$query->set( 'meta_type', 'string' );
		}

	}


	public static function manage_taxonomies_for_columns( $taxonomies ) {

		$taxonomies[] = 'wsuwp_university_org';
		return $taxonomies;

	}


	public static function init() {

		add_action( 'init', array( __CLASS__, 'register_post_type' ), 11 );
		add_action( 'transition_post_status', array( __CLASS__, 'handle_post_status_transititon' ), 10, 3 );
		add_action( 'admin_enqueue_scripts', array( __CLASS__, 'profile_import_control' ) );
		add_action( 'manage_' . self::$slug . '_posts_custom_column', __CLASS__ . '::manage_custom_column', 10, 2 );
		add_action( 'pre_get_posts', __CLASS__ . '::pre_get_posts' );

		add_filter( 'the_title', __CLASS__ . '::replace_title_on_render', 100 );
		add_filter( 'the_content', __CLASS__ . '::render_content_for_rest_requests', 99 );
		add_filter( 'manage_' . self::$slug . '_posts_columns', __CLASS__ . '::manage_columns' );
		add_filter( 'manage_edit-' . self::$slug . '_sortable_columns', __CLASS__ . '::manage_sortable_columns' );
		add_filter( 'manage_taxonomies_for_' . self::$slug . '_columns', __CLASS__ . '::manage_taxonomies_for_columns' );

	}

}

Post_Type_Profile::init();
