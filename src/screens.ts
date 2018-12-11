import { Navigation } from 'react-native-navigation';

import * as Movie from './containers/movie';

export function registerScreens(Provider: any, store: any) {
	Navigation.registerComponentWithRedux('Movie.List', () => Movie.List, Provider, store);
	Navigation.registerComponentWithRedux('Movie.Favourites', () => Movie.Favourites, Provider, store);
	Navigation.registerComponentWithRedux('Movie.Single', () => Movie.Single, Provider, store);
}
