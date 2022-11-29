<?php namespace WSUWP\Plugin\People_Directory;

class Scripts {

	public static function register_block_editor_assets() {

		$editor_asset             = include Plugin::get( 'dir' ) . 'assets/dist/profile-editor.asset.php';
		$settings_page_asset      = include Plugin::get( 'dir' ) . 'assets/dist/settings-page.asset.php';
		$edit_profiles_page_asset = include Plugin::get( 'dir' ) . 'assets/dist/edit-profiles-page.asset.php';

		// student editor
		wp_register_script(
			'wsuwp-plugin-people-directory-profile-editor-scripts',
			Plugin::get( 'url' ) . 'assets/dist/profile-editor.js',
			$editor_asset['dependencies'],
			$editor_asset['version']
		);

		wp_register_style(
			'wsuwp-plugin-people-directory-profile-editor-styles',
			Plugin::get( 'url' ) . 'assets/dist/profile-editor.css',
			array(),
			$editor_asset['version']
		);

		// settings page
		wp_register_script(
			'wsuwp-plugin-people-directory-settings-page-scripts',
			Plugin::get( 'url' ) . 'assets/dist/settings-page.js',
			$settings_page_asset['dependencies'],
			$settings_page_asset['version']
		);

		wp_register_style(
			'wsuwp-plugin-people-directory-settings-page-styles',
			Plugin::get( 'url' ) . 'assets/dist/settings-page.css',
			array(),
			$editor_asset['version']
		);

		// wsuwp_people_profile posts edit page
		wp_register_script(
			'wsuwp-plugin-people-directory-edit-profiles-page-scripts',
			Plugin::get( 'url' ) . 'assets/dist/edit-profiles-page.js',
			$edit_profiles_page_asset['dependencies'],
			$edit_profiles_page_asset['version']
		);

		wp_register_style(
			'wsuwp-plugin-people-directory-edit-profiles-page-styles',
			Plugin::get( 'url' ) . 'assets/dist/edit-profiles-page.css',
			array(),
			$editor_asset['version']
		);

	}

	public static function init() {

		add_action( 'init', __CLASS__ . '::register_block_editor_assets' );

	}
}

Scripts::init();
