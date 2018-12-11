/** @format */

import { combineReducers } from 'redux';

import { favouriteMovie, movie } from '../containers/movie/reducer';
import { FavouriteMovieState, MovieState } from '../containers/movie/types';

export interface ApplicationState {
	favouriteMovie: FavouriteMovieState,
	movie: MovieState,
}

export const rootReducer = combineReducers<ApplicationState>({
	favouriteMovie,
	movie,
});

export default rootReducer;
