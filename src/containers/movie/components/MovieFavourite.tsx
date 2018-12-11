/** @format */

import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '../../../components';
import { COLOR } from '../../../constants';
import store from '../../../store';

interface Props {
	id: number,
	isFavourite: boolean,
	onRemove: Function,
	shouldAnimate: boolean,
};

export default class MovieFavourite extends React.PureComponent<Props> {

	static defaultProps = {
		shouldAnimate: false,
		onRemove: () => {},
	}

	dispatch = () => {
		const {
			id,
			isFavourite,
		} = this.props;

		store.dispatch({
			type: 'FAVOURITE_MOVIE',
			payload: {
				id,
				shouldFavourite: !isFavourite,
			},
		});

	}

	handleFavourite = () => {
		const {
			isFavourite,
			onRemove,
			shouldAnimate,
		} = this.props;

		if (isFavourite && shouldAnimate) {
			onRemove(this.dispatch)
			return;
		}

		this.dispatch();
	}

	render() {
		const {
			isFavourite,
		} = this.props;

		const icon = isFavourite ? 'md-heart' : 'md-heart-empty';
		return (
			<TouchableOpacity style={style.hitbox} onPress={this.handleFavourite}>
				<Icon name={icon} style={style.icon} />
			</TouchableOpacity>
		);
	}

}

const style = StyleSheet.create({

	hitbox: {
		padding: 3,
	},

	icon: {
		fontSize: 24,
		color: COLOR.BRAND,
	},
});
