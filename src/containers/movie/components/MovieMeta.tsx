/** @format */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR } from '../../../constants';

interface Props {
	label: string,
	value: string|number,
};

export default class MovieMeta extends React.PureComponent<Props> {

	render() {
		const { label, value } = this.props;

		if (!value) {
			return null;
		}

		return (
			<View style={style.wrapper}>
				<Text style={style.label}>{label}:</Text>
				<Text style={style.value}>{value}</Text>
			</View>
		);
	}

}

const style = StyleSheet.create({

	wrapper: {
		flexDirection: 'row',
		marginBottom: 1,
	},

	label: {
		color: COLOR.TEXT,
		fontSize: 14,

	},

	value: {
		marginLeft: 5,
		fontSize: 14,
	},
});
