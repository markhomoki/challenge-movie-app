/** @format */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import _ from 'lodash';
import Loader from './Loader';
import { COLOR } from '../constants';

interface Props {
	data: any,
	forceRefresh: boolean,
	isLoading: boolean,
};

export default class ContentLoader extends React.PureComponent<Props> {

	static defaultProps = {
		data: false,
		forceRefresh: false,
		isLoading: true,
	}

	render() {
		const {
			data,
			forceRefresh,
			isLoading,
		} = this.props;
		const hasData = _.isArray(data) ? data.length > 0 : !!data;

		if (!isLoading || (!forceRefresh && hasData)) {
			if (hasData) {
				return this.props.children;
			}

			return (
				<View style={style.noResults}>
					<Text style={style.noResultsText}>No data available</Text>
				</View>
			);
		}

		return <Loader />;
	}

}

const style = StyleSheet.create({

	noResults: {
		paddingVertical: 30,
		paddingHorizontal: 10,
	},

	noResultsText: {
		fontSize: 18,
		color: COLOR.TEXT,
		textAlign: 'center',
	},
});
