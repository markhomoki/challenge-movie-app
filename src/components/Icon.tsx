/** @format */

import * as React from 'react';
import CustomIcon from 'react-native-vector-icons/Ionicons';

interface Props {
	name: string,
	style?: any,
}

export default class Icon extends React.PureComponent<Props> {

	render() {
		const {
			name,
			style,
		} = this.props;

		return (
			<CustomIcon name={name} style={style} />
		);
	}

}
