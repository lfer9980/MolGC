'use client';
/*
	ORGANISMS - FOOTER SIMPLE
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
// #endregion


// #region assets
import config from 'config';
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


function FooterSimpleMolGC({
	label = 'Fisicoquímica Computacional Labs / UACH',
	noMargin = false,
	theme = ''
}) {
	// #region hooks & others
	const marginStyle = !noMargin ? styles.margin : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.footer} ${styles[appliedTheme]} ${marginStyle}`}>
			<p className={styles.footer_header}>
				Powered By
			</p>

			<p className={styles.footer_label}>
				{label}
			</p>

			<p className={styles.footer_version}>
				v{config?.version}
			</p>
		</div>
	);
	// #endregion
}

export { FooterSimpleMolGC };
