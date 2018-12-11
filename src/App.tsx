/** @format */

import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { registerScreens } from './screens';
import store from './store';
import { iconsMap, iconsLoaded } from './utils/icons';
import { COLOR } from './constants';

export function start() {
	registerScreens(Provider, store);

	Navigation.events().registerAppLaunchedListener(async () => {
		await iconsLoaded;
		Navigation.setDefaultOptions({
			bottomTab: {
				iconColor: COLOR.TEXT,
				textColor: COLOR.TEXT,
				selectedIconColor: COLOR.BRAND,
				selectedTextColor: COLOR.BRAND,
			},
		});

		Navigation.setRoot({
			root: {
				bottomTabs: {
					children: [{
						stack: {
							children: [{
								component: {
									name: 'Movie.List',
									passProps: {
										text: 'Movies',
									},
								},
							}],
							options: {
								bottomTab: {
									text: 'Movies',
									icon: iconsMap['md-film'],
								},
							},
						},
					}, {
						stack: {
							children: [{
								component: {
									id: 'Movie.Favourites',
									name: 'Movie.Favourites',
									passProps: {
										text: 'Movies',
									},
								},
							}],
							options: {
								bottomTab: {
									text: 'Favourites',
									icon: iconsMap['md-heart'],
								},
							},
						},
					}],
				},
			}
		});
	});
}
