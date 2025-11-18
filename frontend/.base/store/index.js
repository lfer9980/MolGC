'use client';
/*
	STORE NAME:
	Brief about whats the purpose of this store
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
import { EXAMPLE_INITIAL_DATA } from './__data__';
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
// #endregion


const ExampleStoreContext = createContext();

export function ExampleStoreProvider({ children }) {
	// #region contexts
	// #endregion


	// #region references
	// #endregion


	// #region variables
	// #endregion

	// #region states
	const [state, dispatch] = useReducer(ReducerAuth, EXAMPLE_INITIAL_DATA);
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
		<ExampleStoreContext.Provider
			value={{
				state,
				loading,
				handlerState,
				handlerLoading,
			}}
		>
			{children}
		</ExampleStoreContext.Provider>
	);
	// #endregion
};

// #region useHook
export function useExampleStore() {
	const context = useContext(ExampleStoreContext);

	if (!context) {
		return {
			state: EXAMPLE_INITIAL_DATA,
			handlerState: () => console.warn('handlerState llamado sin contexto'),
			handlerLoading: () => console.warn('handlerLoading llamado sin contexto'),
		};
	};

	return context;
};
// #endregion
