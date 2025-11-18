'use client';
/*
	JOB STORE:
	Saves all info about Job Session on LocalStorage.
*/

// #region libraries
import {
	createContext,
	useContext,
	useEffect,
	useReducer,
} from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
import { ACTION_REDUCER_JOB, INITIAL_JOB } from './model';
// #endregion


// #region hooks
import { ReducerJob } from './reducer';
import { useLocalStorage } from 'hooks/__core__';
// #endregion


// #region contexts & stores
// #endregion


const JobStoreContext = createContext();

export function JobStoreProvider({ name = 'JOB_V1', children }) {
	// #region contexts
	const {
		getLocalStorage,
		setLocalStorage,
		deleteLocalStorage,
	} = useLocalStorage({
		name: name,
		initial: INITIAL_JOB,
	});
	// #endregion


	// #region references
	// #endregion


	// #region variables
	// #endregion

	// #region states
	const [job, dispatchJob] = useReducer(
		ReducerJob,
		INITIAL_JOB,
		(initial) => {
			const localData = getLocalStorage({ name });
			return localData || initial;
		}
	);
	// #endregion

	// #region memos & callbacks
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerCreateJobStore = ({ data }) => {
		if (data) dispatchJob({
			type: ACTION_REDUCER_JOB.CREATE,
			payload: data,
		});
	};

	const handlerUpdateJobStore = ({ data }) => {
		if (data) dispatchJob({
			type: ACTION_REDUCER_JOB.UPDATE,
			payload: data,
		});
	};

	const handlerDeleteJobStore = () => {
		dispatchJob({
			type: ACTION_REDUCER_JOB.DELETE,
		});
		deleteLocalStorage({ name: name });
	};

	// #endregion


	// #region effects
	useEffect(() => {
		if (job) setLocalStorage({ name: name, data: job });
	}, [job]);
	// #endregion


	// #region others
	// #endregion


	// #region main
	return (
		<JobStoreContext.Provider
			value={{
				job,
				handlerCreateJobStore,
				handlerUpdateJobStore,
				handlerDeleteJobStore,
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
			job: INITIAL_JOB,
			handlerCreateJobStore: () => console.warn('handlerCreateJobStore llamado sin contexto'),
			handlerUpdateJobStore: () => console.warn('handlerUpdateJobStore llamado sin contexto'),
			handlerDeleteJobStore: () => console.warn('handlerDeleteJobStore llamado sin contexto'),
		};
	};

	return context;
};
// #endregion
