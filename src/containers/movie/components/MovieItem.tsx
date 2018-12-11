/** @format */

import React from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { COLOR, CONFIG } from '../../../constants';
import MovieMeta from './MovieMeta'
import MovieFavourite from './MovieFavourite'
import { MovieType } from '../types';

interface Props {
	componentId: string,
	data: MovieType,
	removable: boolean,
};

export default class MoviteItem extends React.PureComponent<Props> {

	static defaultProps = {
		removable: false,
	}

	animated: any;

	constructor(props: Props) {
		super(props);

		this.animated = new Animated.Value(1);
	}

	handleRemove = (onRemove: Function) => {
		Animated.timing(this.animated, {
			toValue: 0,
			duration: 300,
		}).start(() => onRemove());
	}

	handleNavigate = () => {
		const { data } = this.props;
		Navigation.push(this.props.componentId, {
			component: {
				name: 'Movie.Single',
				passProps: {
					id: data.id,
				},
				options: {
					topBar: {
						title: {
							text: data.title,
						},
					},
				},
			},
		});
	}

	render() {
		const {
			data,
			removable,
		} = this.props;

		const onRemove = removable ? this.handleRemove : undefined;
		const height = this.animated.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 180],
		});

		return (
			<TouchableOpacity onPress={this.handleNavigate}>
				<Animated.View style={[style.animationWrapper, { height }]}>
					<View style={style.wrapper}>
						<Image
							source={{ uri: `${CONFIG.CDN_URL}/${data.poster_path}` }}
							style={style.poster}
						/>
						<View style={style.contentWrapper}>
							<View style={style.titleWrapper}>
								<Text numberOfLines={1} style={style.title}>{data.title}</Text>
								<MovieFavourite
									id={data.id}
									isFavourite={data.is_favourite}
									shouldAnimate={removable}
									onRemove={onRemove}
								/>
							</View>
							<Text numberOfLines={3} style={style.description}>{data.overview}</Text>
							<MovieMeta label="Rating" value={data.vote_average} />
							<MovieMeta label="Release Date" value={data.release_date} />
							<MovieMeta label="Language" value={data.original_language} />
						</View>
					</View>
				</Animated.View>
			</TouchableOpacity>
		);
	}

}

const style = StyleSheet.create({

	animationWrapper: {
		overflow: 'hidden',
	},

	wrapper: {
		flexDirection: 'row',
		padding: 12,
	},

	poster: {
		width: 100,
		height: 150,
		borderRadius: 10,
	},

	contentWrapper: {
		flex: 1,
		marginLeft: 12,
	},

	titleWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	title: {
		fontWeight: "300",
		fontSize: 20,
		marginBottom: 2,
		paddingRight: 4,
		flex: 1,
	},

	description: {
		fontSize: 14,
		marginBottom: 8,
		color: COLOR.TEXT,
	},
});
