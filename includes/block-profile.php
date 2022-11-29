<?php namespace WSUWP\Plugin\People_directory;

class Block_Profile {

	private static function get_render_data( $post, $attributes ) {

		$meta = get_post_meta( $post->ID );
		$meta = array_map(
			function( $n ) {
				return $n[0];
			},
			$meta
		);

		$display_name = $meta['wsuwp_display_name'] ?: $meta['_wsuwp_fallback_display_name'];
		$name         = ! empty( $display_name ) ? $display_name : get_the_title();

        $photo_id = $meta['wsuwp_photo'];
        $photo_url = $photo_id ? wp_get_attachment_image_src( $photo_id, 'medium' )[0] : $meta['_wsuwp_fallback_photo'];
        $photo_srcset = $photo_id ? wp_get_attachment_image_srcset( $photo_id ) : $meta['_wsuwp_fallback_photo_srcset'];


		return array(
			'name'           => $name,
			'titles'         => unserialize( $meta['wsuwp_title'] ) ?: unserialize( $meta['_wsuwp_fallback_title'] ),
			'office'         => $meta['wsuwp_office'] ?: $meta['_wsuwp_fallback_office'],
			'email'          => $meta['wsuwp_email'] ?: $meta['_wsuwp_fallback_email'],
			'address'        => $meta['wsuwp_address'] ?: $meta['_wsuwp_fallback_address'],
			'phone'          => $meta['wsuwp_phone'] ?: $meta['_wsuwp_fallback_phone'],
			'degrees'        => unserialize( $meta['wsuwp_degree'] ) ?: unserialize( $meta['_wsuwp_fallback_degree'] ),
			'website'        => $meta['wsuwp_website'] ?: $meta['_wsuwp_fallback_website'],
			'bio'            => true === $attributes['hasCustomBio'] ? get_the_content() : $meta['_wsuwp_fallback_bio'],

			'classification' => '',
			'category'       => '',
			'location'       => '',
			'organization'   => '',
			'tag'            => '',
			'focus'          => '',

			'photo_sizes'    => '',
			'photo_srcset'   => $photo_srcset,
			'photo'          => $photo_url,
		);

	}

	public static function render( $attributes, $content ) {

		global $post;

		$data = self::get_render_data( $post, $attributes );

		ob_start();

		include Plugin::get( 'template_dir' ) . '/block-profile.php';

		return ob_get_clean();

	}


	public static function register_block() {

		register_block_type(
			'wsuwp/people-directory-profile',
			array(
				'render_callback' => array( __CLASS__, 'render' ),
				'api_version'     => 2,
				'editor_script'   => 'wsuwp-plugin-people-directory-profile-editor-scripts',
				'editor_style'    => 'wsuwp-plugin-people-directory-profile-editor-styles',
			)
		);

	}


	public static function init() {

		add_action( 'init', __CLASS__ . '::register_block' );

	}
}

Block_Profile::init();
