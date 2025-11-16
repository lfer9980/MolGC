/*
	REDUCER STRUCTURE | JOB
*/
// #region libraries
// #endregion

import { ACTION_REDUCER_JOB, INITIAL_JOB } from "./model";

// #region utils
// #endregion


export const ReducerJob = (state, action) => {
	let newState;

	switch (action.type) {
		case ACTION_REDUCER_JOB.CREATE:
			return { ...action.payload };

		case ACTION_REDUCER_JOB.UPDATE:
			newState = { ...state, ...action.payload }
			return newState;

		case ACTION_REDUCER_JOB.DELETE:
			return INITIAL_JOB;

		default:
			return state;
	}
};