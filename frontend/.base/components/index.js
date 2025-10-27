'use client';
/* 
	TYPE - ELEMENT
	General structure for UI Component.
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { ComponentSkeleton } from './skeleton';
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
import { useHook } from './useHook';
// #endregion


// #region contexts & stores
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context';
// #endregion


function ComponentName({ theme = '' }) {
	// #region hooks & others
	const {
		loading,
	} = useHook({

	});
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	if (loading) return (
		<ComponentSkeleton />
	);
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.class} theme-${appliedTheme}`}></div>
	);
	// #endregion
}

export { ComponentName };