/** @format */

import _ from 'lodash';
import { Navigation } from 'react-native-navigation';
import api from '../../utils/api';
import { Action } from '../../types';
import { FavouriteMovieState, MovieState } from './types';

const defaultState = {
	collection: {},
	currentCollection: [],
	error: null,
	isLoading: true,
	receivedAt: null,
};

export function movie(state: MovieState = defaultState, action: Action) {
	switch (action.type) {
		case 'MOVIE_PENDING': {
			return {
				...state,
				isLoading: true,
			};
		}
		case 'MOVIE_REJECTED': {
			return {
				...state,
				isLoading: false,
				error: action.payload.data,
			};
		}
		case 'MOVIE_FULFILLED': {
			const normalizedData = api.normalizeData(state, action);
			return {
				...state,
				isLoading: false,
				...normalizedData,
			};
		}
		default: {
			return state;
		}
	}
}

export function favouriteMovie(state: FavouriteMovieState = [], action: Action) {
	switch (action.type) {
		case 'FAVOURITE_MOVIE': {
			const { id, shouldFavourite } = action.payload;

			const badgeCount = state.length + (shouldFavourite ? 1 : -1);

			Navigation.mergeOptions('Movie.Favourites', {
				bottomTab: {
					badge: (badgeCount || '').toString(),
				}
			});

			if (shouldFavourite) {
				return _.uniq([...state, id]);
			}

			return state.filter(o => o !== id);
		}
		default: {
			return state;
		}
	}
}
