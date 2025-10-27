'use client';
/* 
	ATOMS - HEADING SUBTITLE
*/
// #region libraries
import React from 'react';
import Link from 'next/link';
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


function HeadingSubtitle({
	icon,
	symbol = '',
	title = '',
	subtitle = '',
	label = '',
	labelLink = '',
	href = '',
	alt = 'image',
	size = 24,
	center = false,
	accent = false,
	border = false,
	upperCase = false,
	children,
	theme = ''
}) {
	// #region hooks & others
	const centerStyle = center ? styles.center : '';
	const accentStyle = accent ? styles.accent : '';
	const borderStyle = border ? styles.border : '';
	// #endregion

	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.title} theme-${appliedTheme}`}>
			{title &&
				<p className={`${styles.title_heading} ${centerStyle} ${accentStyle} ${borderStyle}`}>
					{title}
				</p>
			}

			<div className={styles.title_main}>
				{subtitle &&
					<div className={`${styles.title_subtitle} ${centerStyle}`}>
						{(icon || symbol) &&
							<Badge
								icon={icon}
								symbol={symbol}
								size={size}
								alt={alt}
								noPadding
							/>
						}

						{subtitle &&
							<p className={`${styles.title_subtitle} ${accentStyle}`}>
								{upperCase ? subtitle.toUpperCase() : subtitle}
							</p>
						}
					</div>
				}

				{(label || children) &&
					<div className={`${styles.title_label} ${centerStyle}`}>
						{label || children}
					</div>
				}

				{href &&
					<Link
						className={styles.title_link}
						href={href}
					>
						{labelLink}
					</Link>
				}
			</div>
		</div>
	);
	// #endregion
}

export { HeadingSubtitle };