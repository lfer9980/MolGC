'use client';
/* 
	context for theme
*/

// #region libraries
import {
	createContext,
	useContext,
	useEffect,
	useState
} from 'react';

import { SkeletonTheme } from 'react-loading-skeleton';
// #endregion


// #region components
// #endregion


// #region assets
import { THEME_ENUM } from './__data__';
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
// #endregion


// #region hooks 
// #endregion


const ThemeStoreContext = createContext();


export function ThemeStoreProvider({ children }) {
	// #region contexts
	// #endregion


	// #region references
	// #endregion


	// #region variables
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region states
	const [theme, setTheme] = useState(null);
	const [systemPrefersDark, setSystemPrefersDark] = useState(false);
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerTheme = (newValue) => {
		let newTheme;

		if (newValue === THEME_ENUM.SYSTEM) {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			newTheme = prefersDark ? THEME_ENUM.DARK : THEME_ENUM.LIGHT;

			localStorage.removeItem('theme');
		} else {
			newTheme = newValue;
			localStorage.setItem('theme', newTheme);
		}

		setTheme(newTheme);
	};

	// #endregion


	// #region effects
	useEffect(() => {
		const storedTheme = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		/* important note: this line is on purpose to always force dark theme */
		const initialTheme = storedTheme || (prefersDark ? THEME_ENUM.DARK : THEME_ENUM.DARK);

		setSystemPrefersDark(prefersDark);
		setTheme(initialTheme);
	}, []);


	useEffect(() => {
		if (!theme) return;
		document.body.classList.remove('theme-light', 'theme-dark');
		document.body.classList.add(`theme-${theme}`);
	}, [theme]);
	// #endregion


	// #region others
	if (theme === null) return null;
	// #endregion


	// #region main
	return (
		<ThemeStoreContext.Provider
			value={{
				theme,
				systemPrefersDark,
				handlerTheme
			}}
		>
			<SkeletonTheme
				baseColor={theme === THEME_ENUM.LIGHT ? colorsApp.skeleton : colorsApp.skeleton_inverse}
			>
				{children}
			</SkeletonTheme>
		</ThemeStoreContext.Provider>
	);
	// #endregion
}

// #region useHook
export function useThemeStore() {
	const context = useContext(ThemeStoreContext);

	if (!context) {
		return {
			theme: null,
			systemPrefersDark: false,
			handlerTheme: () => console.warn('handlerTheme llamado sin contexto'),
		};
	}

	return context;
};
// #endregion