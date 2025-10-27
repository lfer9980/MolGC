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
// #endregion


// #region utils
// #endregion


// #region hooks
import { useSemanticLayout } from 'hooks';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function FooterSimple({
	children,
	theme = ''
}) {
	// #region hooks & others
	const {
		content,
		subcontent,
	} = useSemanticLayout({
		components: children
	});
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<footer className={`${styles.footer} theme-${appliedTheme}`}>
			{content &&
				<div className={styles.footer_content}>
					{content}
				</div>
			}


			{subcontent &&
				<div className={styles.footer_subcontent}>
					{subcontent}
				</div>
			}
		</footer>
	);
	// #endregion
}

export { FooterSimple };