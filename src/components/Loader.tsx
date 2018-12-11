/** @format */

import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export default class Loader extends React.PureComponent {

	render() {
		return (
			<View style={style.wrapper}>
				<ActivityIndicator animating />
			</View>
		);
	}

}

const style = StyleSheet.create({

	wrapper: {
		flex: 1,
		paddingTop: 200,
		paddingBottom: 60,
		alignItems: 'center',
	},
});
