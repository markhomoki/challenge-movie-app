/** @format */

import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { ApplicationState } from '../../reducers';
import { COLOR } from '../../constants';
import * as selector from './selector';
import { MovieItem } from './components';
import { MovieType } from './types';

interface Props {
	movieArray: MovieType[],
	componentId: string,
};

class Favourites extends React.PureComponent<Props> {

	static options() {
		return {
			topBar: {
				title: {
					text: 'Favourites',
				},
			},
		};
	}

	renderItem = ({ item }: { item: MovieType }) => (
		<MovieItem
			componentId={this.props.componentId}
			data={item}
			removable
		/>
	)

	render() {
		const {
			movieArray,
		} = this.props;

		if (movieArray.length === 0) {
			return (
				<ScrollView contentContainerStyle={style.scrollView}>
					<Text style={style.noResultsText}>Your favourite movies will be listed here once you added them</Text>
				</ScrollView>
			);
		}

		return (
			<FlatList
				data={movieArray}
				keyExtractor={item => item.id.toString()}
				renderItem={this.renderItem}
			/>
		);
	}

}

const mapStateToProps = (state: ApplicationState) => {
	const getFavouriteMovieArray = selector.makeGetFavouriteMovieArray();

	return {
		movieArray: getFavouriteMovieArray(state),
	};
};

export default connect(mapStateToProps)(Favourites);

const style = StyleSheet.create({

	scrollView: {
		paddingTop: 120,
		paddingHorizontal: 40,
	},

	noResultsText: {
		fontSize: 18,
		color: COLOR.TEXT,
		textAlign: 'center',
	},
});
