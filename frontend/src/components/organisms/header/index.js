'use client';
/* 
ORGANISMS - HEADER
*/
// #region libraries
import React from 'react';
import Link from 'next/link';
// #endregion


// #region components
import { ElementImage } from 'components/molecules';
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
import { useHeader } from '../__core__/headers/useHeader';
// #endregion


// #region contexts & stores
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context';
// #endregion


function HeaderMolGC({
	second = false,
	transparent = false,
	theme = ''
}) {
	// #region hooks & others
	const {
		rootRef,
	} = useHeader({});

	const transparentStyle = transparent ? styles.transparent : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.header} theme-${appliedTheme} ${transparentStyle}`}>
			<Link
				href={`/${rootRef}`}
				className={styles.header_logo}
			>
				<ElementImage
					image='/images/logotipo_bw.png'
					width={150}
					height={60}
				/>
			</Link>

			{second && (
				<ElementImage
					image='/images/logotipo_uach_bw.png'
					width={60}
					height={60}
				/>
			)}
		</div>
	);
	// #endregion
}

export { HeaderMolGC };