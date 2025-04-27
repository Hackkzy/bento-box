<?php
/**
 * Plugin Name:       Bento Box
 * Description:       A customizable grid block lets users create Bento Layout in block editor.
 * Version:           1.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Hackkzy
 * Author URI:        https://github.com/Hackkzy
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       bento-box
 *
 * @package bbx-bento-box
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Defining Constants.
 *
 * @package bbx-bento-box
 */
if ( ! defined( 'BENTOBOX_VERSION' ) ) {
	/**
	 * The version of the plugin.
	 */
	define( 'BENTOBOX_VERSION', '1.1.0' );
}

if ( ! defined( 'BENTOBOX_PATH' ) ) {
	/**
	 *  The server file system path to the plugin directory.
	 */
	define( 'BENTOBOX_PATH', plugin_dir_path( __FILE__ ) );
}

if ( ! defined( 'BENTOBOX_URL' ) ) {
	/**
	 * The url to the plugin directory.
	 */
	define( 'BENTOBOX_URL', plugin_dir_url( __FILE__ ) );
}

if ( ! defined( 'BENTOBOX_BASE_NAME' ) ) {
	/**
	 * The url to the plugin directory.
	 */
	define( 'BENTOBOX_BASE_NAME', plugin_basename( __FILE__ ) );
}

// Sets translated strings for a script.
if ( ! function_exists( 'bentobox_set_script_translations' ) ) :
	/**
	 * Sets translated strings for a script.
	 *
	 * @return void
	 */
	function bentobox_set_script_translations() {
		wp_set_script_translations( 'bbx-bento-box-script', 'bento-box' );
	}
endif;
add_action( 'init', 'bentobox_set_script_translations' );

// Apply translation file as per WP language.
if ( ! function_exists( 'bentobox_text_domain_loader' ) ) :
	/**
	 * Apply translation file as per WP language.
	 */
	function bentobox_text_domain_loader() {

		// Get mo file as per current locale.
		$mofile = BENTOBOX_PATH . 'languages/' . get_locale() . '.mo';

		// If file does not exists, then apply default mo.
		if ( ! file_exists( $mofile ) ) {
			$mofile = BENTOBOX_PATH . 'languages/default.mo';
		}

		load_textdomain( 'bento-box', $mofile );
	}
endif;
add_action( 'plugins_loaded', 'bentobox_text_domain_loader' );

// Registers the block using the metadata loaded from the `block.json` file.
if ( ! function_exists( 'bentobox_block_init' ) ) :
	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	function bentobox_block_init() {
		register_block_type( __DIR__ . '/build/bento-box' );
		register_block_type( __DIR__ . '/build/bento-card' );
	}
endif;
add_action( 'init', 'bentobox_block_init' );
