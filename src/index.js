/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { navigation as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import './style.scss';
import Edit from './edit';
import metadata from './block';

const { name, category, attributes, supports } = metadata;

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( name, {
	title: __( 'Classic menu', 'classic-menu-block' ),
	description: __(
		'Render classic menu data as a block',
		'classic-menu-block'
	),
	keywords: [
		__( 'classic', 'classic-menu-block' ),
		__( 'menu', 'classic-menu-block' ),
		__( 'navigation', 'classic-menu-block' ),
	],
	category,
	attributes,
	supports,
	icon,
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
} );
