<?php namespace WSUWP\Plugin\People_Directory;

class Plugin {


	private static $version = '0.1.4';


	public static function get( $property ) {

		switch ( $property ) {

			case 'version':
				return self::$version;

			case 'dir':
				return plugin_dir_path( dirname( __FILE__ ) );

			case 'url':
				return plugin_dir_url( dirname( __FILE__ ) );

			case 'template_dir':
				return plugin_dir_path( dirname( __FILE__ ) ) . '/templates';

			default:
				return '';

		}

	}

	public static function init() {

		require_once __DIR__ . '/helpers.php';
		require_once __DIR__ . '/block-profile.php';
		require_once __DIR__ . '/taxonomies.php';
		require_once __DIR__ . '/post-type-profile.php';
		require_once __DIR__ . '/scripts.php';
		require_once __DIR__ . '/page-settings.php';
		require_once __DIR__ . '/profile-data-trait.php';
		require_once __DIR__ . '/profiles-importer.php';
		require_once __DIR__ . '/profiles-updater.php';
		require_once __DIR__ . '/taxonomies-updater.php';

	}


	public static function require_class( $class_name ) {

		require_once self::get( 'dir' ) . '/classes/class-' . $class_name . '.php';

	}
}

Plugin::init();
