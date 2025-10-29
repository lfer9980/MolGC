'use client';
/* 
	JOB STORE:
	Saves all info about Job Session on LocalStorage.
*/

// #region libraries
import {
	createContext,
	useContext,
	useReducer,
	useState
} from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
import { ReducerAuth } from './reducer';
import { JOB_INITIAL_DATA } from './__data__';
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
// #endregion


const JobStoreContext = createContext();

export function JobStoreProvider({ children }) {
	// #region contexts
	// #endregion


	// #region references
	// #endregion


	// #region variables
	// #endregion

	// #region states
	const [state, dispatch] = useReducer(ReducerAuth, Job_INITIAL_DATA);
	const [loading, setLoading] = useState(false);
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerState = () => console.log('hola mundo!');
	const handlerLoading = () => setLoading(prev => !prev);
	// #endregion


	// #region effects
	// #endregion


	// #region others
	// #endregion


	// #region main
	return (
		<JobStoreContext.Provider
			value={{
				state,
				loading,
				handlerState,
				handlerLoading,
			}}
		>
			{children}
		</JobStoreContext.Provider>
	);
	// #endregion
};

// #region useHook
export function useJobStore() {
	const context = useContext(JobStoreContext);

	if (!context) {
		return {
			state: JOB_INITIAL_DATA,
			handlerState: () => console.warn('handlerState llamado sin contexto'),
			handlerLoading: () => console.warn('handlerLoading llamado sin contexto'),
		};
	};

	return context;
};
// #endregion