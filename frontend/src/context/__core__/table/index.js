'use client';
/* 
	Context for simplify logic handling on tables
*/

// #region libraries
import { createContext, useContext } from 'react';
// #endregion


// #region components
// #endregion


// #region assets
import { INITIAL_TABLE } from './__data__';
// #endregion


// #region utils

// #endregion


// #region hooks 
// #endregion

export const TableContext = createContext(INITIAL_TABLE);

// #region useHook
export function useTableContext() {
	const context = useContext(TableContext);

	if (!context) {
		return INITIAL_TABLE;
	}

	return context;
};
// #endregion