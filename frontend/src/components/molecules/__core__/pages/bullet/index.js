'use client';
/* 
	MOLECULES - PAGE BULLET
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


function PageBullets({
	pages = 4,
	current = 1,
	size = 8,
	theme = ''
}) {
	// #region hooks & others
	const elements = Array(pages).fill(0);
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region main UI
	return (
		<div className={styles.pages_wrap}>
			<div className={`${styles.pages}`}>
				{elements.map((_, i) => {
					const prev = current - 1;

					return (
						<BadgeBullet
							key={i}
							size={size}
							color={i === prev ? appliedTheme === 'dark' ? colorsApp.gray : colorsApp.blue : colorsApp.transparent}
							border={i === prev ? false : true}
							pill
						/>
					)
				})}
			</div>
		</div>
	);
	// #endregion
}

export { PageBullets };