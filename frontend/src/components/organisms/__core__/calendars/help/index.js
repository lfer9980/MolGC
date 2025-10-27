'use client';
/* 
	ORGANISMS - CALENDARS HELP
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
// #endregion


// #region hooks
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function CalendarHelp({
	elements = [],
	size = 16,
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
		<div className={`${styles.help} theme-${appliedTheme}`}>
			{elements?.map((item, i) => (
				<div
					key={i}
					className={styles.help_title}
				>
					<BadgeBullet
						color={item?.color}
						size={size}
					/>

					{item?.label}
				</div>
			))}
		</div>
	);
	// #endregion
}

export { CalendarHelp };