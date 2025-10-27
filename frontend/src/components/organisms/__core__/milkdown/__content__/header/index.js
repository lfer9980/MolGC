'use client';
/* 
	ORGANISMS - MILKDOWN HEADER
*/
// #region libraries
import React from 'react';
import Image from 'next/image';
// #endregion


// #region components
import { HeadingTitle } from 'components/atoms';
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


function MilkdownHeader({
	title = '',
	label = '',
	image = '',
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
		<div className={`${styles.header} theme-${appliedTheme}`}>
			<figure className={styles.header_image}>
				<Image
					src={image ? image : '/images/logotipo.png'}
					sizes='auto'
					priority
					fill
					alt={label}
				/>
			</figure>

			<div className={styles.header_data}>
				<HeadingTitle
					subheading={title}
					label={label}
				/>
			</div>
		</div>
	);
	// #endregion
}

export { MilkdownHeader };