/** @format */

import React from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { ContentLoader, Search } from '../../components';
import { fetchData } from '../../actions';
import { ApplicationState } from '../../reducers';
import * as selector from './selector';
import { MovieItem } from './components';
import { MovieType, MovieState } from './types';

interface Props {
	componentId: string,
	dispatch: any,
	movieArray: MovieType[],
	movies: MovieState,
};

interface State {
	forceRefresh: boolean,
	page: number,
	search: string,
};

class List extends React.PureComponent<Props, State> {

	static options() {
		return {
			topBar: {
				noBorder: true,
				elevation: 0,
				title: {
					text: 'Movies',
				},
			},
		};
	}

	state = {
		forceRefresh: true,
		page: 1,
		search: '',
	}

	componentDidMount() {
		this.fetchData(true);
	}

	fetchData = (initial: boolean = false) => {
		const {
			page,
			search,
		} = this.state;

		this.setState({ forceRefresh: initial });

		const url = search ? `/search/movie?page=${page}&query=${search}` : `/discover/movie?page=${page}`;

		this.props.dispatch(fetchData({
			url,
			type: 'MOVIE',
			merge: !initial,
		}));
	}

	handleSearch = (search: string) => {
		this.setState({
			search,
			page: 1,
		}, () => this.fetchData(true));
	}

	handleLoadMore = () => {
		if (!this.props.movies.isLoading) {
			this.setState((prevState) => ({ page: prevState.page + 1 }), this.fetchData);
		}
	}

	renderItem = ({ item }: { item: MovieType }) => <MovieItem data={item} componentId={this.props.componentId} />

	render() {
		const {
			movieArray,
			movies,
		} = this.props;

		return (
			<View>
				<Search onSearch={this.handleSearch} />
				<ContentLoader
					data={movies.currentCollection}
					forceRefresh={this.state.forceRefresh}
					isLoading={movies.isLoading}
				>
					<FlatList
						keyboardShouldPersistTaps="always"
						data={movieArray}
						keyboardDismissMode="on-drag"
						keyExtractor={item => item.id.toString()}
						onEndReached={this.handleLoadMore}
						renderItem={this.renderItem}
					/>
				</ContentLoader>
			</View>
		);
	}

}

const mapStateToProps = (state: ApplicationState) => {
	const getMovieArray = selector.makeGetMovieArray();
	const getMovies = selector.makeGetMovies();

	return {
		movieArray: getMovieArray(state),
		movies: getMovies(state),
	};
};

export default connect(mapStateToProps)(List);
