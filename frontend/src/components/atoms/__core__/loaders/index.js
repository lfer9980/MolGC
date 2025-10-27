'use client';
/* 
	ATOMS - LOADER
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
import 'styles/animations/all.css';
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


export const LOADER_ENUM = {
	DOTS: 'dots',
	FACTORY: 'factory',
	LINES: 'lines',
	SPINNER: 'spinner',
}

function Loader({
	size = 38,
	type = LOADER_ENUM.DOTS,
	number = 1,
	label = '',
	theme = '',
}) {
	// #region hooks & others
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region main UI
	return (
		<div
			className={styles.loader}
			style={{ width: size }}
		>
			<div className={styles.loader_wrapper}>
				<div
					className={`loader-${type}-${number} theme-${appliedTheme}`}
					style={{ width: size }}
				/>
			</div>

			{label &&
				<p className={`${styles.loader_label}`}>
					{label}
				</p>
			}
		</div >
	);
	// #endregion
}

export { Loader };