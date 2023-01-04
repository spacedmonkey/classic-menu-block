/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

/**
 * @typedef {Object} NavigationEntitiesData
 * @property {Array|undefined} menus                - a collection of Menu entity objects.
 * @property {boolean}         isResolvingMenus     - indicates whether the request to fetch menus is currently resolving.
 * @property {boolean}         hasResolvedMenus     - indicates whether the request to fetch menus has finished resolving.
 * @property {Array|undefined} menusItems           - a collection of Menu Item entity objects for the current menuId.
 * @property {boolean}         hasResolvedMenuItems - indicates whether the request to fetch menuItems has finished resolving.
 * @property {boolean}         hasPages             - indicates whether there is currently any data for pages.
 * @property {boolean}         hasMenus             - indicates whether there is currently any data for menus.
 */

/**
 * Manages fetching and resolution state for all entities required
 * for the Navigation block.
 *
 * @return { NavigationEntitiesData } the entity data.
 */
export default function useNavigationEntities() {
	const { menus, isResolvingMenus, hasResolvedMenus, locations, isResolvingLocations, hasResolvedLocations } = useSelect(
		(select) => {
			const { getMenus, getMenuLocations, isResolving, hasFinishedResolution } =
				select(coreStore);

			const menusParameters = [{ per_page: -1, context: 'view' }];

			return {
				menus: getMenus(...menusParameters),
				isResolvingMenus: isResolving('getMenus', menusParameters),
				hasResolvedMenus: hasFinishedResolution(
					'getMenus',
					menusParameters
				),
				locations: getMenuLocations(),
				isResolvingLocations: isResolving('getMenuLocations'),
				hasResolvedLocations: hasFinishedResolution('getMenuLocations'),
			};
		},
		[]
	);

	return {
		menus,
		isResolvingMenus,
		hasResolvedMenus,
		hasMenus: !!(hasResolvedMenus && menus?.length),
		locations,
		isResolvingLocations,
		hasResolvedLocations,
		hasLocations: !!(hasResolvedLocations && locations?.length),
	};
}
