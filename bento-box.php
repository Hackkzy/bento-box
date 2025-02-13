<?php
/**
 * Plugin Name:       Bento Box
 * Description:       A customizable grid block lets users create Bento Layout in block editor.
 * Version:           1.0.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Hackkzy
 * Author URI:        https://github.com/Hackkzy
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       bbx-bento-box
 *
 * @package bbx-bento-box
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Defining Constants.
 *
 * @package    bbx-bento-box
 */
if ( ! defined( 'BBX_VERSION' ) ) {
	/**
	 * The version of the plugin.
	 */
	define( 'BBX_VERSION', '1.0.0' );
}

if ( ! defined( 'BBX_PATH' ) ) {
	/**
	 *  The server file system path to the plugin directory.
	 */
	define( 'BBX_PATH', plugin_dir_path( __FILE__ ) );
}

if ( ! defined( 'BBX_URL' ) ) {
	/**
	 * The url to the plugin directory.
	 */
	define( 'BBX_URL', plugin_dir_url( __FILE__ ) );
}

if ( ! defined( 'BBX_BASE_NAME' ) ) {
	/**
	 * The url to the plugin directory.
	 */
	define( 'BBX_BASE_NAME', plugin_basename( __FILE__ ) );
}


/**
 * Sets translated strings for a script.
 *
 * @return void
 */
function bbx_set_script_translations() {
	wp_set_script_translations( 'bbx-bento-box-script', 'bbx-bento-box' );
}
add_action( 'init', 'bbx_set_script_translations' );

/**
 * Apply translation file as per WP language.
 */
function bbx_text_domain_loader() {

	// Get mo file as per current locale.
	$mofile = BBX_PATH . 'languages/' . get_locale() . '.mo';

	// If file does not exists, then apply default mo.
	if ( ! file_exists( $mofile ) ) {
		$mofile = BBX_PATH . 'languages/default.mo';
	}

	load_textdomain( 'bbx-bento-box', $mofile );
}
add_action( 'plugins_loaded', 'bbx_text_domain_loader' );

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function bbx_bento_box_block_init() {
	register_block_type( __DIR__ . '/build/bento-box' );
	register_block_type( __DIR__ . '/build/bento-card' );
}
add_action( 'init', 'bbx_bento_box_block_init' );
