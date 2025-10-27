'use client';
/* 
	MOLECULES - ELEMENT DOWNLOAD
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { Badge } from 'components/atoms';
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


function ElementAdd({
	icon,
	symbol = 'open_in_new',
	label = '',
	size = 24,
	color = colorsApp.green,
	border = false,
	handler,
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
		<div
			className={`${styles.element} theme-${appliedTheme}`}
			onClick={() => handler && handler()}
		>
			<div className={styles.element_main}>
				<Badge
					icon={icon}
					symbol={symbol}
					color={color}
					size={size}
					border={border}
					pill
					rounded
				/>

				<p
					className={styles.element_title}
					style={{ color: color }}
				>
					{label}
				</p>
			</div>
		</div>
	);
	// #endregion
}

export { ElementAdd };