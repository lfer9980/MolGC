'use client';
/*
	hook for handling logic on profile component
*/

// #region libraries
import { useEffect, useRef, useState } from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
import { THEME_OPTIONS } from 'context/__core__/theme/__data__';
// #endregion


// #region hooks
import { useClickOutside } from 'hooks';
// #endregion


// #region contexts & stores
import { useThemeStore } from 'context/__core__';
// #endregion


// #region requests
// #endregion


function useProfile({ }) {
	// #region references
	const ref = useRef(null);

	// #endregion


	// #region contexts & hooks
	const {
		theme: systemTheme,
		handlerTheme,
	} = useThemeStore({});
	// #endregion


	// #region variables
	// #endregion


	// #region states
	const [opened, setOpened] = useState(false);
	const [selectedTheme, setSelectedTheme] = useState(THEME_OPTIONS[0]);

	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerSelectedTheme = (value) => {
		/* change selected theme on local state and context */
		handlerTheme(value?.name);
		setSelectedTheme(value);
	};

	const handlerToggleDropdown = () => setOpened(!opened);
	// #endregion


	// #region effects
	useEffect(() => {
		const match = THEME_OPTIONS.find(item => item.name === systemTheme);
		if (match) setSelectedTheme(match);
	}, [systemTheme]);
	// #endregion


	// #region others
	useClickOutside({
		ref: ref,
		handler: () => setOpened(false),
		enabled: opened,
	});
	// #endregion


	// #region main
	return {
		ref,
		opened,
		selectedTheme,
		handlerSelectedTheme,
		handlerToggleDropdown,
	};
	// #endregion
}


export { useProfile };
