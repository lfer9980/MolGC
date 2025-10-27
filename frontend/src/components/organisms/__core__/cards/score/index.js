'use client';
/* 
	ORGANISMS - CARDS - OTHERS - SCORE
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { HeadingTitle } from 'components/atoms';
import { ListStars } from 'components/molecules';
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


function CardScore({
	title = '',
	value,
	maxValue = 5,
	commentLen = 0,
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
		<div className={`${styles.card} theme-${appliedTheme}`}>
			<HeadingTitle
				subtitle={title}
			/>

			<ListStars
				value={value}
				maxValue={maxValue}
				size={32}
			/>

			<p className={styles.card_label}>
				{`${commentLen} comentarios generales`}
			</p>
		</div>
	);
	// #endregion
}

export { CardScore };