'use client';
/*
	MOLECULES - ELEMENT SECTION
*/
// #region libraries
import React from 'react';
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


function ElementSection({
	title = '',
	subheading = '',
	subtitle = '',
	label = '',
	children,
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
		<div className={`${styles.element} theme-${appliedTheme}`}>
			<HeadingTitle
				title={title}
				subheading={subheading}
				subtitle={subtitle}
			/>

			{label || children &&
				<div className={styles.element_label}>
					{label || children}
				</div>
			}
		</div>
	);
	// #endregion
}

export { ElementSection };
