/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { SelectControl, Placeholder, Disabled } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import { navigation as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import useNavigationEntities from './use-navigation-entities';
import './editor.scss';
import metadata from './block';

const { name } = metadata;

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object}   props
 * @param {Function} props.setAttributes
 * @param {Object}   props.attributes
 * @param {boolean}  props.isSelected
 * @return {WPElement} Element to render.
 */
export default function Edit({ setAttributes, attributes, isSelected }) {
	const { menu = 0, theme_location = '' } = attributes || {};

	const { menus, hasMenus, locations, hasLocations } = useNavigationEntities();

	const menu_options = [{ value: 0, label: __('Menu not set', 'classic-menu-block') }];
	if (hasMenus) {
		menus.forEach(function (item) {
			menu_options.push({ value: parseInt(item.id), label: item.name });
		});
	}

	const location_options = [{ value: '', label: __('Location not set', 'classic-menu-block') }];
	if (hasLocations) {
		locations.forEach(function (item) {
			location_options.push({ value: item.name, label: item.description });
		});
	}

	const onSaveMenu = (value) => {
		setAttributes({ menu: parseInt(value) });
	};

	const onSaveLocation = (value) => {
		setAttributes({ theme_location: value });
	};

	return (
		<div {...useBlockProps()}>
			{isSelected || (!menu && !theme_location) ? (
				<Placeholder
					label={__('Classic menu', 'classic-menu-block')}
					icon={icon}
					instructions={__('Select a menu or a theme location. The selected menu overrules the selected theme location.', 'classic-menu-block')}
				>

					<SelectControl
						label={__('Select a menu', 'classic-menu-block')}
						options={menu_options}
						value={menu}
						onChange={onSaveMenu}
					/>

					<SelectControl
						label={__('Select a theme location', 'classic-menu-block')}
						options={location_options}
						value={theme_location}
						onChange={onSaveLocation}
					/>
				</Placeholder>
			) : (
				<Disabled>
					<ServerSideRender block={name} attributes={attributes} />
				</Disabled>
			)}
		</div>
	);
}
