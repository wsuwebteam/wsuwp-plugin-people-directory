<?php namespace WSUWP\Plugin\People_directory;

class Profile {

	public $post_id      = 0;
	public $nid          = '';
	public $first_name   = '';
	public $last_name    = '';
	public $display_name = '';
	public $title        = array();
	public $office       = '';
	public $email        = '';
	public $address      = '';
	public $phone        = '';
	public $degree       = array();
	public $website      = '';
	public $bio          = '';

	public $classification = array();
	public $category       = array();
	public $location       = array();
	public $organization   = array();
	public $tag            = array();
	public $focus          = array();

	public $photo_sizes  = null;
	public $photo_srcset = '';
	public $photo        = '';


	public function __construct( $post_id = 0 ) {

		$this->post_id = $post_id;

	}


	public function get_post_title() {

		if ( 0 !== $this->post_id ) {
			$first_name  = get_post_meta( $this->post_id, 'wsuwp_first_name', true ) ?: $this->first_name;
			$last_name   = get_post_meta( $this->post_id, 'wsuwp_last_name', true ) ?: $this->last_name;
			$middle_name = get_post_meta( $this->post_id, 'wsuwp_middle_name', true ) ?: '';

			return trim( "{$last_name}, {$first_name} {$middle_name}" );
		}

		return trim( "{$this->last_name}, {$this->first_name}" );

	}


	public function insert_profile() {

		$post_data = array(
			'ID'           => $this->post_id,
			'post_title'   => $this->get_post_title(),
			'post_status'  => 'publish',
			'post_author'  => 0,
			'post_type'    => Post_Type_Profile::get( 'post_type' ),

			'post_content' => Helpers::serialize_block_template( array( 'wsuwp/people-directory-profile' ) ),
			'meta_input'   => array(
				'_wsuwp_nid'                     => $this->nid,
				'_wsuwp_fallback_first_name'     => $this->first_name,
				'_wsuwp_fallback_last_name'      => $this->last_name,
				'_wsuwp_fallback_display_name'   => $this->display_name,
				'_wsuwp_fallback_title'          => $this->title,
				'_wsuwp_fallback_office'         => $this->office,
				'_wsuwp_fallback_email'          => $this->email,
				'_wsuwp_fallback_address'        => $this->address,
				'_wsuwp_fallback_phone'          => $this->phone,
				'_wsuwp_fallback_degree'         => $this->degree,
				'_wsuwp_fallback_website'        => $this->website,
				'_wsuwp_fallback_bio'            => $this->bio,

				// '_wsuwp_fallback_category'       => array_column( $this->category, 'slug' ),
				// '_wsuwp_fallback_tag'            => array_column( $this->tag, 'slug' ),
				'_wsuwp_fallback_location'       => array_column( $this->location, 'slug' ),
				'_wsuwp_fallback_organization'   => array_column( $this->organization, 'slug' ),
				'_wsuwp_fallback_classification' => array_column( $this->classification, 'slug' ),
				'_wsuwp_fallback_focus'          => array_column( $this->focus, 'slug' ),

				'_wsuwp_fallback_photo_sizes'    => $this->photo_sizes,
				'_wsuwp_fallback_photo_srcset'   => $this->photo_srcset,
				'_wsuwp_fallback_photo'          => $this->photo,
			),
		);

		$post_id = wp_insert_post( $post_data );

		self::set_terms( $post_id );

	}


	public function update_profile() {

		$post_data = array(
			'ID'         => $this->post_id,
			'post_title' => $this->get_post_title(), // need to prioritize non fallback fields first
			'meta_input' => array(
				'_wsuwp_fallback_first_name'     => $this->first_name,
				'_wsuwp_fallback_last_name'      => $this->last_name,
				'_wsuwp_fallback_display_name'   => $this->display_name,
				'_wsuwp_fallback_title'          => $this->title,
				'_wsuwp_fallback_office'         => $this->office,
				'_wsuwp_fallback_email'          => $this->email,
				'_wsuwp_fallback_address'        => $this->address,
				'_wsuwp_fallback_phone'          => $this->phone,
				'_wsuwp_fallback_degree'         => $this->degree,
				'_wsuwp_fallback_website'        => $this->website,
				'_wsuwp_fallback_bio'            => $this->bio,

				'_wsuwp_fallback_location'       => array_column( $this->location, 'slug' ),
				'_wsuwp_fallback_organization'   => array_column( $this->organization, 'slug' ),
				'_wsuwp_fallback_classification' => array_column( $this->classification, 'slug' ),
				'_wsuwp_fallback_focus'          => array_column( $this->focus, 'slug' ),

				'_wsuwp_fallback_photo_sizes'    => $this->photo_sizes,
				'_wsuwp_fallback_photo_srcset'   => $this->photo_srcset,
				'_wsuwp_fallback_photo'          => $this->photo,
			),
		);

		self::update_terms();
		wp_update_post( $post_data );

	}


	private function update_terms() {

		$taxonomies = array(
			'wsuwp_university_location' => array(
				'current' => get_post_meta( $this->post_id, '_wsuwp_fallback_location', true ),
				'remote'  => $this->location,
			),
			'wsuwp_university_org'      => array(
				'current' => get_post_meta( $this->post_id, '_wsuwp_fallback_organization', true ),
				'remote'  => $this->organization,
			),
			'classification'            => array(
				'current' => get_post_meta( $this->post_id, '_wsuwp_fallback_classification', true ),
				'remote'  => $this->classification,
			),
			'wsuwp_focus_area'          => array(
				'current' => get_post_meta( $this->post_id, '_wsuwp_fallback_focus', true ),
				'remote'  => $this->focus,
			),
		);

		foreach ( $taxonomies as $key => $taxonomy ) {
			$terms_to_add      = array();
			$terms_to_remove   = array();
			$current_terms     = $taxonomy['current'] ?: array();
			$remote_terms      = $taxonomy['remote'];
			$remote_term_slugs = array_column( $remote_terms, 'slug' );

			// find terms to add by checking if any remote terms are not in the fallback meta
			foreach ( $remote_terms as $remote_term ) {
				$slug = $remote_term->slug;

				if ( ! in_array( $slug, $current_terms, true ) ) {
					$terms_to_add[] = $remote_term;
				}
			}

			// find terms to remove by checking if fallback meta contains terms that are not longer in remote terms
			foreach ( $current_terms as $current_term ) {
				if ( ! in_array( $current_term, $remote_term_slugs, true ) ) {
					$terms_to_remove[] = $current_term;
				}
			}

			self::create_terms( $terms_to_add, $key );
			wp_add_object_terms( $this->post_id, array_column( $terms_to_add, 'slug' ), $key );
			wp_remove_object_terms( $this->post_id, $terms_to_remove, $key );
		}

	}


	private function set_terms( $post_id ) {

		$taxonomies = array(
			// 'category'                  => $this->category,
			// 'post_tag'                  => $this->tag,
			'wsuwp_university_location' => $this->location,
			'wsuwp_university_org'      => $this->organization,
			'classification'            => $this->classification,
			'wsuwp_focus_area'          => $this->focus,
		);

		foreach ( $taxonomies as $taxonomy => $terms ) {
			self::create_terms( $terms, $taxonomy );
			wp_set_object_terms( $post_id, array_column( $terms, 'slug' ), $taxonomy );
		}

	}


	private function create_terms( $terms, $taxonomy ) {

		foreach ( $terms as $term_data ) {
			$existing_term_id = term_exists( $term_data->slug, $taxonomy );

			if ( ! $existing_term_id ) {
				wp_insert_term(
					$term_data->name,
					$taxonomy,
					array(
						'slug' => $term_data->slug,
					)
				);
			}
		}

	}


}
