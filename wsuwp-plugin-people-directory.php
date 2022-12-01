<?php
/**
 * Plugin Name: WSUWP People Directory
 * Plugin URI: https://github.com/wsuwebteam/wsuwp-plugin-people-directory
 * Description: Plugin to manage a local people directory.
 * Version: 0.0.2
 * Requires PHP: 7.0
 * Author: Washington State University, Danial Bleile, Dan White
 * Author URI: https://web.wsu.edu/
 * Text Domain: wsuwp-plugin-people-directory
 */


// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

add_action( 'after_setup_theme', 'wsuwp_plugin_people_directory' );

function wsuwp_plugin_people_directory() {

		// $people_api_domain = str_ends_with( $_SERVER['HTTP_HOST'], '.local' )
		$people_api_domain = ( substr( $_SERVER['HTTP_HOST'], -strlen( '.local' ) ) === '.local' )
			? 'http://peopleapi.local'
			: 'https://people.wsu.edu';

		define( 'PEOPLE_API_DOMAIN', $people_api_domain );

		require_once __DIR__ . '/includes/plugin.php';

}

register_deactivation_hook( __FILE__, 'wsuwp_plugin_people_directory_plugin_deactivation' );

function wsuwp_plugin_people_directory_plugin_deactivation() {
	wp_clear_scheduled_hook( 'wsu_profiles_sync_event' );
	wp_clear_scheduled_hook( 'wsu_taxonomies_sync_event' );
}
