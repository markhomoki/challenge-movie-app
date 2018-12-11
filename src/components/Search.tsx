/** @format */

import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import _ from 'lodash';
import Icon from './Icon';

interface Props {
	onSearch: Function,
};

export default class Search extends React.PureComponent<Props> {

	constructor(props: Props) {
		super(props);

		this.handleChange = _.debounce(this.handleChange, 300)
	}

	handleChange = (value: string) => {
		this.props.onSearch(value);
	}

	render() {
		return (
			<View style={style.searchOuter}>
				<View style={style.searchWrapper}>
					<Icon name="ios-search" style={style.icon} />
					<TextInput
						clearButtonMode="always"
						onChangeText={this.handleChange}
						placeholder="Search Movies"
						placeholderTextColor="#9A9A9E"
						returnKeyType="search"
						style={style.input}
					/>
				</View>
			</View>
		);
	}

}

const style = StyleSheet.create({

	searchOuter: {
		paddingTop: 0,
		paddingBottom: 12,
		paddingHorizontal: 16,
		borderBottomWidth: 1,
		backgroundColor: '#FFFFFF',
		borderBottomColor: '#E9E9E9',
		elevation: 1.5,
	},

	searchWrapper: {
		backgroundColor: '#F2F2F3',
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 8,
	},

	icon: {
		color: '#9A9A9E',
		fontSize: 18,
		marginTop: 1,
	},

	input: {
		height: 35,
		flex: 1,
		fontSize: 17,
		paddingHorizontal: 8,
		paddingTop: 0,
		paddingBottom: 0,
	},
});
