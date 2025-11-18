'use client';
/*
	MOLECULES - ELEMENT QUOUTE
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function ElementQuote({
	label = '',
	help = '',
	children,
	theme = ''
}) {
	// #region hooks & others
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region main UI
	return (
		<article className={`${styles.element} theme-${appliedTheme}`}>
			<div className={styles.element_main}>
				<p className={styles.element_label}>
					&laquo; {label || children} &raquo;
				</p>
			</div>

			{help &&
				<p className={styles.element_help}>
					{help}
				</p>
			}
		</article>
	);
	// #endregion
}

export { ElementQuote };
