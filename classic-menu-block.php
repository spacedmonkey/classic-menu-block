<?php
/**
 * Plugin Name:       Classic Menu Block
 * Plugin URI:        https://github.com/spacedmonkey/classic-menu-block
 * Description:       A gutenberg block to use classic menus.
 * Requires at least: 5.9
 * Requires PHP:      5.6
 * Version:           0.1.5
 * Author:            Jonathan Harris
 * Author URI:        https://www.spacedmonkey.com/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       classic-menu-block
 *
 * @package           spacedmonkey/classic-menu-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 *
 * @since 0.1.0
 */
function create_block_classic_menu_block_block_init() {
	register_block_type(
		__DIR__,
		[
			'render_callback' => 'render_block_classic_menu',
		]
	);
}
add_action( 'init', 'create_block_classic_menu_block_block_init' );

/**
 * Block render callback.
 *
 * @since 0.1.0
 * @param array $attrs Block attributes.
 *
 * @return string
 */
function render_block_classic_menu( $attrs ) {
	$attrs      = wp_parse_args(
		$attrs,
		[
			'className' => '',
			'anchor'    => '',
			'menu'      => 0,
		]
	);
	$menu_attrs = [
		'echo'            => false,
		'container_class' => 'wp-classic-menu-block ' . $attrs['className'],
		'container_id'    => $attrs['anchor'],
		'menu'            => $attrs['menu'],
	];

	/**
	 * Filters menu attributes.
	 *
	 * @since 0.1.0
	 *
	 * @param array $menu_attrs Menu attributes.
	 * @param array $attrs Block attributes.
	 */
	$menu_attrs = apply_filters( 'classic_menu_block_attributes', $menu_attrs, $attrs );

	return (string) wp_nav_menu( $menu_attrs );
}
