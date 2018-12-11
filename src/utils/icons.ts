/** @format */

import Ionicons from 'react-native-vector-icons/Ionicons';
import { HashedObject } from '../types';

// define your suffixes by yourself..
// here we use active, big, small, very-big..
const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons: HashedObject = {
	'md-film': [24, '#bbb', Ionicons],
	'md-heart': [24, '#bbb', Ionicons],
};

const iconsMap: HashedObject = {};
const iconsLoaded = new Promise((resolve) => {
	Promise.all(
		Object.keys(icons).map((iconName) => {
			return Ionicons.getImageSource(
				iconName.replace(replaceSuffixPattern, ''),
				icons[iconName][0],
				icons[iconName][1],
			);
		})
	).then((sources) => {
		Object.keys(icons).forEach((iconName, idx) => iconsMap[iconName] = sources[idx]);

		// Call resolve (and we are done)
		resolve(true);
	});
});

export {
	iconsMap,
	iconsLoaded,
};
