'use client';
/* 
	handles session info
*/

// #region libraries
import {
	createContext,
	useContext,
	useReducer
} from 'react';
// #endregion


// #region components
// #endregion


// #region assets
import {
	INITIAL_SESSION,
	ACTION_REDUCER_AUTH,
} from './model';
// #endregion


// #region utils
import { ReducerAuth } from './reducer';
// #endregion


// #region hooks 
import { useLocalStorage } from 'hooks';
// #endregion


const SessionStoreContext = createContext();

export function SessionStoreProvider({ name = 'SESSION_V1', children }) {
	// #region contexts
	const {
		getLocalStorage,
		setLocalStorage,
		deleteLocalStorage,
	} = useLocalStorage({
		name: name,
		initial: INITIAL_SESSION,
	});
	// #endregion


	// #region references
	// #endregion


	// #region variables
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region states
	const [session, dispatchSession] = useReducer(ReducerAuth, INITIAL_SESSION);
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerLogin = ({ data }) => {
		/* for login to platform */
		if (data) {
			dispatchSession({
				type: ACTION_REDUCER_AUTH.LOGIN,
				payload: { data },
			});

			setLocalStorage({ name: name, data: data });
		};
	};


	const handlerLogout = () => {
		/* for logout from platform */
		dispatchSession({ type: ACTION_REDUCER_AUTH.LOGOUT });
		deleteLocalStorage({ name: name });
	};


	const handlerGetSession = () => {
		/* returns session data from localStorage */
		getLocalStorage({ name: name });
	};
	// #endregion


	// #region effects
	// #endregion


	// #region others
	// #endregion


	// #region main
	return (
		<SessionStoreContext.Provider
			value={{
				session,
				handlerLogin,
				handlerLogout,
				handlerGetSession,
			}}
		>
			{children}
		</SessionStoreContext.Provider>
	);
	// #endregion
}

// #region useHook
export function useSessionStore() {
	const context = useContext(SessionStoreContext);

	if (!context) {
		return {
			session: INITIAL_SESSION,
			handlerLogin: () => console.warn('handlerLogin llamado sin contexto'),
			handlerLogout: () => console.warn('handlerLogout llamado sin contexto'),
			handlerGetSession: () => console.warn('handlerGetSession llamado sin contexto'),
		};
	}

	return context;
};
// #endregion