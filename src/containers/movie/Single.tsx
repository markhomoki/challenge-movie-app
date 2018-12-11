/** @format */

import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchData } from '../../actions';
import { ApplicationState } from '../../reducers';
import { OwnProps } from '../../types';
import { ContentLoader } from '../../components';
import { COLOR, CONFIG } from '../../constants';
import * as selector from './selector';
import { MovieMeta, MovieFavourite } from './components';
import { MovieState, MovieType } from './types';

interface Props {
	dispatch: any,
	id: number,
	movie: MovieType,
	movies: MovieState,
};

class Single extends React.PureComponent<Props> {

	componentDidMount() {
		this.fetchData();
	}

	fetchData = () => {
		this.props.dispatch(fetchData({
			type: 'MOVIE',
			url: `/movie/${this.props.id}`,
			merge: true,
		}));
	}

	handleFavourite = () => {
		const { id, movie } = this.props;

		this.props.dispatch({
			type: 'FAVOURITE_MOVIE',
			payload: {
				id,
				shouldFavourite: !movie.is_favourite,
			},
		});
	}

	render() {
		const {
			movie,
			movies,
		} = this.props;

		const genres = movie.genres ? movie.genres.map(genre => genre.name).join(', ') : '';

		return (
			<ScrollView>
				<Image
					source={{ uri: `${CONFIG.CDN_URL}/${movie.poster_path}` }}
					style={style.poster}
				/>
				<View style={style.contentWrapper}>
					<View style={style.titleWrapper}>
						<Text style={style.title}>{movie.title}</Text>
						<MovieFavourite id={movie.id} isFavourite={movie.is_favourite} />
					</View>

					<ContentLoader
						data={movie.id}
						forceRefresh
						isLoading={movies.isLoading}
					>
						<Text style={style.description}>{movie.overview}</Text>
						<MovieMeta label="Rating" value={movie.vote_average} />
						<MovieMeta label="Release Date" value={movie.release_date} />
						<MovieMeta label="Language" value={movie.original_language} />
						<MovieMeta label="Genres" value={genres} />

					</ContentLoader>
				</View>
			</ScrollView>
		);
	}

}

const mapStateToProps = (state: ApplicationState, ownProps: OwnProps) => {
	const getMovie = selector.makeGetMovie();
	const getMovies = selector.makeGetMovies();

	return {
		movie: getMovie(state, ownProps.id),
		movies: getMovies(state),
	};
};

export default connect(mapStateToProps)(Single);

const style = StyleSheet.create({

	poster: {
		width: '100%',
		height: 320,
	},

	contentWrapper: {
		padding: 20,
		zIndex: 1,
	},

	titleWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	title: {
		fontWeight: "300",
		fontSize: 24,
		marginBottom: 5,
		flex: 1,
	},

	description: {
		fontSize: 14,
		marginBottom: 8,
		color: COLOR.TEXT,
	},
});
