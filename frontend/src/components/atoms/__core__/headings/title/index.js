'use client';
/*
	ATOMS - HEADING TITLE
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
// #endregion


// #region hooks
// #endregion


// #region styles
import styles from '../styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function HeadingTitle({
	icon,
	symbol = '',
	title = '',
	subheading = '',
	subtitle = '',
	label = '',
	alt = '',
	size = 32,
	center = false,
	accent = false,
	children,
	theme = ''
}) {
	// #region hooks & others
	const centerStyle = center ? styles.center : '';
	const accentStyle = accent ? styles.accent : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.title} theme-${appliedTheme}`}>
			<div className={`${styles.title_head} ${centerStyle} ${accentStyle}`}>
				{(icon || symbol) &&
					<Badge
						icon={icon}
						symbol={symbol}
						size={size}
						alt={alt}
						theme={appliedTheme}
						noPadding
					/>
				}

				{title && <p className={styles.title_title}>{title}</p>}
			</div>

			<div className={`${styles.title_main}`}>
				{subheading &&
					<p className={styles.title_subheading}> {subheading} </p>
				}

				{subtitle &&
					<p className={`${styles.title_subtitle} ${centerStyle}`}>
						{subtitle.toUpperCase()}
					</p>
				}

				{(label || children) &&
					<div className={`${styles.title_label}`}>
						{label || children}
					</div>
				}
			</div>
		</div>
	);
	// #endregion
}

export { HeadingTitle };
