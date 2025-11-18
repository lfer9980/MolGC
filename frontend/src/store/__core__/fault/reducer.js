/*
	reducer for fault store
*/
// #region libraries
// #endregion

// #region utils
import { ACTION_REDUCER_FAULT } from './model';
// #endregion


export const ReducerFault = (state, action) => {
	let newState;
	const indexItem = state.findIndex(item => item.name === action.name);

	switch (action.type) {
		case ACTION_REDUCER_FAULT.SET:
			newState = [...state];

			const newFault = {
				name: action.name,
				labels: [...action.payload],
			};

			if (indexItem === -1) {
				newState.push(newFault);
			} else {
				newState[indexItem] = newFault;
			};

			return newState;


		case ACTION_REDUCER_FAULT.REMOVE:
			newState = [...state];
			newState.splice(indexItem, 1);

			return newState;


		default:
			return state;
	}
};
