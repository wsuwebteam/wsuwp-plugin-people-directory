<?php namespace WSUWP\Plugin\People_directory;

class Profiles_Updater {
	use Profile_Data_Trait;

	private static function get_local_profiles( $profile_ids ) {

		$posts_per_page = empty( $profile_ids ) ? 50 : -1;

		$args = array(
			'posts_per_page' => $posts_per_page,
			'post_type'      => Post_Type_Profile::get( 'post_type' ),
			'orderby'        => 'modified',
			'order'          => 'ASC',
			'meta_query'     => array(
				array(
					'key'     => '_wsuwp_nid',
					'value'   => '',
					'compare' => '!=',
				),
			),
		);

		if ( ! empty( $profile_ids ) ) {
			$args['post__in'] = $profile_ids;
		}

		$query = new \WP_Query( $args );

		return $query->posts;

	}


	private static function update_profile( $nid, $profile_data ) {

		$profile_id = $profile_data['local_profile']->ID;

		// unpublish post if there is not a remote match
		if ( is_null( $profile_data['remote_profile'] ) ) {
			wp_update_post(
				array(
					'ID'          => $profile_id,
					'post_status' => 'draft',
				)
			);

			return;
		}

		$profile = self::create_profile( $profile_data['remote_profile'], $profile_id );
		$profile->update_profile();

	}

	public static function update_profiles( $profile_ids = array() ) {

		try {
			// get local profiles
			$local_profiles = self::get_local_profiles( $profile_ids );

			if ( empty( $local_profiles ) ) {
				return;
			}

			// create associative array for local/remote profile data
			$assoc_profiles = self::assoc_local_profiles( $local_profiles );

			// get remote profile data by nids
			$nids            = array_keys( $assoc_profiles );
			$remote_profiles = self::request_profiles( $nids );

			if ( is_wp_error( $remote_profiles ) ) {
				error_log( $remote_profiles->get_error_message() );
				return $remote_profiles;
			}

			// add remote profiles to associative array
			$assoc_profiles = self::assoc_remote_profiles( $assoc_profiles, $remote_profiles );

			// update profiles
			foreach ( $assoc_profiles as $nid => $assoc_profile ) {
				// error_log( 'Updating profile - ' . $assoc_profile['local_profile']->post_title . ' | Last modified - ' . $assoc_profile['local_profile']->post_modified );
				self::update_profile( $nid, $assoc_profile );
			}

			return $assoc_profiles;
		} catch ( Exception $e ) {
			error_log( $e->getMessage() );
			return new WP_Error( 'error', $e->getMessage() );
		}

	}

	private static function assoc_local_profiles( $local_profiles ) {

		$assoc_profiles = array();

		foreach ( $local_profiles as $profile ) {
			$nid = get_post_meta( $profile->ID, '_wsuwp_nid', true );

			$assoc_profiles[ $nid ] = array(
				'local_profile' => $profile,
			);
		}

		return $assoc_profiles;

	}

	private static function assoc_remote_profiles( $assoc_profiles, $remote_profiles ) {

		foreach ( $remote_profiles as $profile ) {
			$nid = $profile->nid;

			$assoc_profiles[ $nid ]['remote_profile'] = $profile;
		}

		return $assoc_profiles;

	}


	public static function run_scheduled_sync() {

		self::update_profiles();

	}

	private static function schedule_recurring_sync() {

		if ( 'true' === get_option( 'wsu_people_directory_enable_profile_updates', 'true' ) ) {
			if ( ! wp_next_scheduled( 'wsu_profiles_sync_event' ) ) {
				wp_schedule_event( time(), 'twicedaily', 'wsu_profiles_sync_event' );
			}
		} else {
			wp_clear_scheduled_hook( 'wsu_profiles_sync_event' );
		}

	}

	public static function init() {

		add_action( 'wsu_profiles_sync_event', __CLASS__ . '::run_scheduled_sync' );

		self::schedule_recurring_sync();

	}

}

Profiles_Updater::Init();
