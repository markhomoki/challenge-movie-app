/** @format */

import api from '../utils/api';
import { HashedObject } from '../types';

interface Payload {
	merge?: boolean,
	type?: string,
	url: string,
};

// custom middleware
export const rejectData = (payload: Payload, response: Object) => {
	return {
		...payload,
		type: `${payload.type}_REJECTED`,
		payload: response || {},
	};
};

export const requestData = (payload: Payload) => {
	return {
		...payload,
		type: `${payload.type}_PENDING`,
	};
};

export const receiveData = (payload: Payload, response: Object) => {
	const merge: boolean = payload.merge || false;

	return {
		...payload,
		merge,
		payload: response,
		receivedAt: Date.now(),
		type: `${payload.type}_FULFILLED`,
	};
};

export const fetchData = (payload: Payload) => (dispatch: any) => {
	dispatch(requestData(payload));
	return api.get(payload.url)
		.then((response) => {
			if (api.error(response)) {
				dispatch(rejectData(payload, response));
				return response;
			}

			// setTimeout(() => {
			dispatch(receiveData(payload, response));
			// }, 5000);
			return response;
		}).catch((error: HashedObject) => {
			if (error.response) {
				return error.response;
			}
			console.log('Error', error.message);

		});
};
