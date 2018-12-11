/** @format */

interface GenreType {
	name: string,
};

export interface MovieType {
	id: number,
	title: string,
	is_favourite: boolean,
	poster_path: string,
	original_language: string,
	overview: string,
	vote_average: number,
	release_date: string,
	genres: GenreType[],
};

export interface MovieState {
	collection: { [name: string]: MovieType },
	currentCollection: number[],
	error: string|null,
	isLoading: boolean,
	receivedAt: string|null,
};

export type FavouriteMovieState = number[];
