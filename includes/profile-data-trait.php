<?php namespace WSUWP\Plugin\People_directory;

trait Profile_Data_Trait {

	private static function request_profiles( $nids ) {

		$people_endpoint = PEOPLE_API_DOMAIN . '/wp-json/peopleapi/v1/people?count=All&nid=';
		$nids_string     = implode( ',', $nids );

		$response = wp_remote_get( $people_endpoint . $nids_string );

		if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
			return new \WP_Error( 'error', wp_remote_retrieve_body( $response ), array( 'status' => 500 ) );
		}

		$body = wp_remote_retrieve_body( $response );

		return json_decode( $body );

	}


	private static function create_profile( $data, $id = 0 ) {

		Plugin::require_class( 'profile' );

		$profile = new Profile( $id );

		$profile->nid          = ! empty( $data->nid ) ? $data->nid : '';
		$profile->first_name   = ! empty( $data->first_name ) ? $data->first_name : '';
		$profile->last_name    = ! empty( $data->last_name ) ? $data->last_name : '';
		$profile->display_name = ! empty( $data->name ) ? $data->name : '';
		$profile->title        = ! empty( $data->title ) ? $data->title : array();
		$profile->office       = ! empty( $data->office ) ? $data->office : '';
		$profile->email        = ! empty( $data->email ) ? $data->email : '';
		$profile->address      = ! empty( $data->address ) ? $data->address : '';
		$profile->phone        = ! empty( $data->phone ) ? $data->phone : '';
		$profile->degree       = ! empty( $data->degree ) ? $data->degree : array();
		$profile->website      = ! empty( $data->website ) ? $data->website : '';

		$profile->classification = ! empty( $data->classification ) ? $data->classification : array();
		$profile->category       = ! empty( $data->category ) ? $data->category : array();
		$profile->location       = ! empty( $data->university_location ) ? $data->university_location : array();
		$profile->organization   = ! empty( $data->university_organization ) ? $data->university_organization : array();
		$profile->tag            = ! empty( $data->tag ) ? $data->tag : array();
		$profile->focus          = ! empty( $data->focus_area ) ? $data->focus_area : array();

		$profile->bio = ! empty( $data->bio ) ? $data->bio : '';

		$profile->photo_sizes  = ! empty( $data->photo_sizes ) ? $data->photo_sizes : null;
		$profile->photo_srcset = ! empty( $data->photo_srcset ) ? $data->photo_srcset : '';
		$profile->photo        = ! empty( $data->photo ) ? $data->photo : '';

		return $profile;

	}

}
