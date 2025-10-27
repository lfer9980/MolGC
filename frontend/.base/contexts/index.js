'use client';
/* 
	CONTEXT - NAME:
	Brief about whats the purpose of this context
*/

// #region libraries
import {
	createContext,
	useContext,
} from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
// #endregion


const ExampleContext = createContext();

export function ExampleProvider({ children }) {
	// #region contexts
	// #endregion


	// #region references
	// #endregion


	// #region variables
	// #endregion


	// #region states
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	// #endregion


	// #region effects
	// #endregion


	// #region others
	// #endregion


	// #region main
	return (
		<ExampleContext.Provider
			value={{
			}}
		>
			{children}
		</ExampleContext.Provider>
	);
	// #endregion
};

// #region useHook
export function useExample() {
	const context = useContext(ExampleContext);

	if (!context) {
		return {
		};
	};

	return context;
};
// #endregion