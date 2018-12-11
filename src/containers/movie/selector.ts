/** @format */

import { createSelector } from 'reselect';
import { ApplicationState } from '../../reducers';

const normalizeMovie = (state: ApplicationState, id: number) => {
	const movie = state.movie.collection[id] || {};
	return {
		...movie,
		is_favourite: state.favouriteMovie.indexOf(id) !== -1,
	};
};

const getFavouriteMovieArray = (state: ApplicationState) => state.favouriteMovie.map(id => normalizeMovie(state, id));
const getMovieArray = (state: ApplicationState) => state.movie.currentCollection.map(id => normalizeMovie(state, id));
const getMovies = (state: ApplicationState) => state.movie;
const getMovie = (state: ApplicationState, id: number) => normalizeMovie(state, id);

export const makeGetFavouriteMovieArray = () => createSelector([getFavouriteMovieArray], obj => obj);
export const makeGetMovieArray = () => createSelector([getMovieArray], obj => obj);
export const makeGetMovies = () => createSelector([getMovies], obj => obj);
export const makeGetMovie = () => createSelector([getMovie], obj => obj);
