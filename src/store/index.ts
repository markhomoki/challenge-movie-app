/** @format */

import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers';

function setupStore() {
	const middlewares = [thunkMiddleware];

	if (__DEV__) {
		const { createLogger } = require('redux-logger');
		const logger = createLogger();
		middlewares.push(logger);
	}

	return createStore(reducer, applyMiddleware(...middlewares));
}

const store = setupStore();

export default store;
