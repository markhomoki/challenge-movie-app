/** @format */

import axios from 'axios';
import _ from 'lodash';
import { CONFIG } from '../constants';
import { Action, HashedObject, Response, State } from '../types';

export default {

	get(url: string) {
		return this.send(url, 'GET');
	},

	async send(url: string, method: string, data: Object = {}) {
		axios.defaults.baseURL = CONFIG.API_URL;
		axios.defaults.params = {};
		axios.defaults.params.api_key = CONFIG.API_KEY;

		const newData = {
			...data,
			method,
		};

		try {
			const response = await axios(url, newData);
			return response;
		}
		catch (error) {
			if (error.response) {
				return error.response;
			}
			return error;
		}
	},

	normalizeCollection(data: HashedObject[] = [], key: string = 'id') {
		const collection: HashedObject = {};
		const currentCollection: number[] = [];

		data.map((item) => {
			const itemId: number = item[key];
			collection[itemId] = {
				...item,
				[key]: itemId,
			};

			currentCollection.push(itemId);
		});

		return {
			collection,
			currentCollection,
		};
	},

	normalizeData(state: State = { collection: {}, currentCollection: [] }, action: Action = {}) {
		let collection: HashedObject = {};
		let { currentCollection } = state;
		const key = 'id';

		// get the resposne from api
		const { data } = action.payload;

		// paginated collection
		if ('results' in data) {
			const normalizedCollection = this.normalizeCollection(data.results, key);
			collection = normalizedCollection.collection;
			currentCollection = normalizedCollection.currentCollection;

			// if merge is true then merges the previous currentCollection with the new currentCollection
			if (action.merge) {
				currentCollection = _.union(state.currentCollection, currentCollection);
			}

		// single item
		} else {
			collection[data[key]] = data;
		}

		return {
			currentCollection,
			collection: {
				...state.collection,
				...collection,
			},
			receivedAt: action.receivedAt || null,
		};
	},

	error(response: Response) {
		// return if status was 200
		if (response && response.status === 200) {
			return false;
		}

		return true;
	},
};
