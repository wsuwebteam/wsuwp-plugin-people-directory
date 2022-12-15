<?php namespace WSUWP\Plugin\People_directory;

class Profiles_Importer {
	use Profile_Data_Trait;


	private static function import_profile( $data ) {

		$profile = self::create_profile( $data );
		$profile->insert_profile();

	}


	public static function import_profiles( \WP_REST_Request $request ) {

		// error if a university organization has not yet been selected
		if ( empty( esc_html( get_option( 'wsu_people_directory_university_organization' ) ) ) ) {
			return new \WP_Error( 'error', 'An organization slug must be seleted on the People Directory settings page before importing profiles.', array( 'status' => 500 ) );
		}

		$params             = $request->get_body_params();
		$nids               = array_map( 'trim', explode( '\n', $params['nids'] ) );
		$unpublish_profiles = $params['unpublishProfiles'];

		if ( 'true' === $unpublish_profiles ) {
			self::unpublish_excluded_profiles( $nids ); // unpublish profiles not listed in list of nids
		}

		$nids = self::prevent_duplicates( $nids );

		if ( empty( $nids ) ) {
			return new \WP_Error( 'error', 'All nids listed have already been imported.', array( 'status' => 500 ) );
		}

		$profiles = self::request_profiles( $nids );

		if ( is_wp_error( $profiles ) ) {
			return $profiles;
		}

		try {
			foreach ( $profiles as $profile ) {
				self::import_profile( $profile );
			}
		} catch ( Exception $e ) {
			return new \WP_Error( 'error', $e->getMessage(), array( 'status' => 500 ) );
		}

		return new \WP_REST_Response(
			array(
				'message' => 'Successfully import profiles.',
			),
			200
		);

	}


	private static function unpublish_excluded_profiles( $nids ) {

		$args = array(
			'posts_per_page' => -1,
			'post_type'      => Post_Type_Profile::get( 'post_type' ),
			'meta_query'     => array(
				array(
					'key'     => '_wsuwp_nid',
					'value'   => array_map( 'trim', $nids ),
					'compare' => 'NOT IN',
				),
			),
		);

		$query = new \WP_Query( $args );

		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();
				$id = get_the_ID();

				$nid = get_post_meta( $id, '_wsuwp_nid', true );

				if ( ! empty( $nid ) ) {
					wp_update_post(
						array(
							'ID'          => $id,
							'post_status' => 'draft',
						)
					);
				}
			}
		}

	}


	private static function prevent_duplicates( $nids ) {

		// remove any duplicates in the input
		$nids = array_unique( $nids );

		// remove already imported profiles by nid
		$args = array(
			'posts_per_page' => -1,
			'post_type'      => Post_Type_Profile::get( 'post_type' ),
			'meta_query'     => array(
				array(
					'key'     => '_wsuwp_nid',
					'value'   => array_map( 'trim', $nids ),
					'compare' => 'IN',
				),
			),
		);

		$query = new \WP_Query( $args );

		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();
				$id = get_the_ID();

				$nid = get_post_meta( $id, '_wsuwp_nid', true );

				if ( ( $index = array_search( $nid, $nids ) ) !== false ) {
					array_splice( $nids, $index, 1 );
				}
			}
		}

		// remove any empty elements
		$nids = array_filter( $nids, 'strlen' );

		return $nids;

	}


	public static function register_api_endpoints() {

		register_rest_route(
			'people-directory-api/v1',
			'/import-profiles',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => array( __CLASS__, 'import_profiles' ),
				'permission_callback' => '__return_true',
			)
		);

	}


	public static function init() {

		add_action( 'rest_api_init', array( __CLASS__, 'register_api_endpoints' ) );

	}

}

Profiles_Importer::Init();
