<?php namespace WSUWP\Plugin\People_directory;

class Taxonomies_Updater {

	public static $taxonomies = array(
		'wsuwp_university_location',
		'wsuwp_university_org',
		'classification',
		'wsuwp_focus_area',
	);


	private static function request_terms( $taxonomies ) {

		$people_endpoint   = PEOPLE_API_DOMAIN . '/wp-json/peopleapi/v1/get-all-terms?taxonomy=';
		$taxonomies_string = implode( ',', $taxonomies );

		$response = wp_remote_get( $people_endpoint . $taxonomies_string );

		if ( 200 !== wp_remote_retrieve_response_code( $response ) ) {
			return new \WP_Error( 'error', wp_remote_retrieve_body( $response ), array( 'status' => 500 ) );
		}

		$body = wp_remote_retrieve_body( $response );

		return json_decode( $body );

	}


	private static function get_matching_term( $local_term, $remote_terms ) {

		foreach ( $remote_terms as $remote_term ) {
			if ( $remote_term->taxonomy === $local_term->taxonomy && $remote_term->slug === $local_term->slug ) {
				return $remote_term;
			}
		}

	}


	private static function get_matched_terms( $local_terms, $remote_terms ) {

		$matched_terms = array();

		foreach ( $local_terms as $local_term ) {
			$key = $local_term->taxonomy . '--' . $local_term->slug;

			$remote_term = self::get_matching_term( $local_term, $remote_terms );

			$matched_terms[ $key ] = array(
				'local'  => $local_term,
				'remote' => $remote_term,
			);
		}

		return $matched_terms;

	}


	private static function update_taxonomies( $taxonomies ) {

		$remote_terms = self::request_terms( $taxonomies );

		if ( is_wp_error( $remote_terms ) ) {
			error_log( $remote_terms->get_error_message() );
			return;
		}

		$local_terms = get_terms(
			array(
				'taxonomy'   => $taxonomies,
				'hide_empty' => false,
				'number'     => 0,
			)
		);

		$matched_terms = self::get_matched_terms( $local_terms, $remote_terms );

		if ( ! empty( $matched_terms ) ) {
			foreach ( $matched_terms as $key => $match ) {
				if ( null !== $match['remote'] && $match['remote']->name !== $match['local']->name ) {
					wp_update_term(
						$match['local']->term_id,
						$match['local']->taxonomy,
						array(
							'name'        => $match['remote']->name,
							'slug'        => $match['local']->slug, // retain local slug
							'description' => $match['remote']->description,
						)
					);
				}
			}
		}

	}


	public static function run_scheduled_sync() {

		self::update_taxonomies( self::$taxonomies );

	}


	private static function schedule_recurring_sync() {

		if ( 'true' === get_option( 'wsu_people_directory_enable_taxonomy_updates', 'true' ) ) {
			if ( ! wp_next_scheduled( 'wsu_taxonomies_sync_event' ) ) {
				wp_schedule_event( time(), 'daily', 'wsu_taxonomies_sync_event' );
			}
		} else {
			wp_clear_scheduled_hook( 'wsu_taxonomies_sync_event' );
		}

	}


	public static function init() {

		add_action( 'wsu_taxonomies_sync_event', __CLASS__ . '::run_scheduled_sync' );

		self::schedule_recurring_sync();

	}

}

Taxonomies_Updater::Init();
