<?php namespace WSUWP\Plugin\People_Directory;

class Taxonomies {

	public static function register_taxonomies() {

		self::register_focus_area_taxonomy();
		self::register_classification_taxonomy();

	}

	private static function register_focus_area_taxonomy() {

		$args = array(
			'labels'       => array(
				'name'          => 'Area of Focus',
				'singular_name' => 'Area of Focus',
				'search_items'  => 'Search Area of Focus',
				'all_items'     => 'All Area of Focus',
				'edit_item'     => 'Edit Area of Focus',
				'update_item'   => 'Update Area of Focus',
				'add_new_item'  => 'Add New Area of Focus',
				'new_item_name' => 'New Area of Focus Name',
				'menu_name'     => 'Area of Focus',
			),
			'description'  => 'Area of Focus',
			'public'       => true,
			'hierarchical' => true,
			'show_ui'      => true,
			'show_in_menu' => true,
			'show_in_rest' => true,
		);

		register_taxonomy( 'wsuwp_focus_area', Post_Type_Profile::get( 'post_type' ), $args );

	}

	private static function register_classification_taxonomy() {

		$slug          = 'classification';
		$default_terms = array(
			'Adjunct',
			'Administrative Professional',
			'Affiliate',
			'Emeritus',
			'Faculty',
			'Graduate Assistant',
			'Hourly',
			'Public Affiliate',
			'Staff',
		);

		$args = array(
			'labels'       => array(
				'name'          => 'Classifications',
				'singular_name' => 'Classification',
				'search_items'  => 'Search Classifications',
				'all_items'     => 'All Classifications',
				'edit_item'     => 'Edit Classification',
				'update_item'   => 'Update Classification',
				'add_new_item'  => 'Add New Classification',
				'new_item_name' => 'New Classification Name',
				'menu_name'     => 'Classifications',
			),
			'description'  => 'Personnel Classifications',
			'public'       => true,
			'hierarchical' => false,
			'show_ui'      => true,
			'show_in_menu' => true,
			'query_var'    => $slug,
			'show_in_rest' => true,
		);

		register_taxonomy( $slug, Post_Type_Profile::get( 'post_type' ), $args );
		self::insert_default_terms( $default_terms, $slug );

	}

	private static function insert_default_terms( $terms, $taxonomy ) {

		foreach ( $terms as $term ) {
			$existing_term_id = term_exists( $term, $taxonomy );

			if ( ! $existing_term_id ) {
				wp_insert_term(
					$term,
					$taxonomy
				);
			}
		}

	}

	public static function init() {

		add_action( 'init', __CLASS__ . '::register_taxonomies' );

	}
}

Taxonomies::init();
