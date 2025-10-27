'use client';
/* 
MOLECULES - ELEMENT - LINK
General structure for UI Component.
*/
// #region libraries
import React from 'react';
import Link from 'next/link';
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


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context';
// #endregion


function ElementLink({
	href = '',
	label = '',
	symbol = 'info',
	theme = ''
}) {
	// #region hooks & others

	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<Link
			className={`${styles.element} theme-${appliedTheme}`}
			href={href}
		>
			<span className={`material-symbols-outlined`}>
				{symbol}
			</span>

			<p className={styles.element_label}>
				{label}
			</p>
		</Link>
	);
	// #endregion
}

export { ElementLink };