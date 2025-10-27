/* 
	store for handles fault state when u are using inputs on a form. 
*/

// #region libraries
import { createContext, useContext, useReducer } from 'react';
// #endregion


// #region components
// #endregion


// #region assets
import { ACTION_REDUCER_FAULT, INITIAL_FAULT } from './model';
// #endregion


// #region utils
import { ReducerFault } from './reducer';
// #endregion


// #region hooks 
// #endregion


const FaultStoreContext = createContext();

export function FaultStoreProvider({ children }) {
	// #region contexts
	// #endregion


	// #region references
	// #endregion


	// #region variables
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region states
	const [fault, dispatchFault] = useReducer(ReducerFault, INITIAL_FAULT);
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerAddFaultState = (name, labels) => {
		dispatchFault({
			type: ACTION_REDUCER_FAULT.SET,
			name: name,
			payload: labels,
		});
	};

	const handlerRemoveFaultState = (name) => {
		dispatchFault({
			type: ACTION_REDUCER_FAULT.REMOVE,
			name: name,
		});
	};
	// #endregion


	// #region effects
	// #endregion


	// #region others
	// #endregion


	// #region main
	return (
		<FaultStoreContext.Provider
			value={{
				fault,
				handlerAddFaultState,
				handlerRemoveFaultState,
			}}
		>
			{children}
		</FaultStoreContext.Provider>
	);
	// #endregion
}

// #region useHook
export function useFaultStore() {
	const context = useContext(FaultStoreContext);

	if (!context) {
		return {
			fault: false,
			handlerAddFaultState: () => console.warn('handlerAddFaultState llamado sin contexto'),
			handlerRemoveFaultState: () => console.warn('handlerRemoveFaultState llamado sin contexto'),
		};
	}

	return context;
};
// #endregion