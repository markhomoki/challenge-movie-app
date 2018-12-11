/** @format */

export interface HashedObject {
	[name: string]: any,
};

export interface Action {
	merge?: boolean,
	payload?: any,
	receivedAt?: string,
	type?: string,
};

export interface State {
	currentCollection: number[],
	collection: HashedObject,
};

export interface Response {
	status?: number,
};

export interface OwnProps {
	id: number,
};
