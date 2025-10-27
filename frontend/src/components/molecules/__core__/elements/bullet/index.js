'use client';
/* 
	MOLECULES - ELEMENT BULLET
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { BadgeBullet } from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
// #endregion


// #region hooks
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function ElementBullet({
	title = '',
	label = '',
	color = colorsApp.blue,
	handler,
	disabled = false,
	theme = ''
}) {
	// #region hooks & others
	const disabledStyle = disabled ? styles.disabled : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion

	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<div
			className={`${styles.element} theme-${appliedTheme} ${disabledStyle}`}
			onClick={handler}
		>
			<BadgeBullet
				size={12}
				color={disabled ? colorsApp.disabled : color}
			/>

			<div className={styles.element_main}>
				<p className={styles.element_title}>
					{title}
				</p>

				<p className={styles.element_label}>
					{label}
				</p>
			</div>
		</div>
	);
	// #endregion
}

export { ElementBullet };