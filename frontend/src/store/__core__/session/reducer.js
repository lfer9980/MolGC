/* 
*/

// #region libraries
// #endregion

// #region utils
import { INITIAL_SESSION, ACTION_REDUCER_AUTH } from './model';
// #endregion


export const ReducerAuth = (state, action) => {
	switch (action.type) {
		case ACTION_REDUCER_AUTH.LOGIN:
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
			};
		case ACTION_REDUCER_AUTH.LOGOUT:
			return INITIAL_SESSION;
		default:
			return state;
	}
};