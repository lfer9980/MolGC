'use client';
/* 
	ORGANISMS - LIST SUMMARY
	General structure for UI Component.
*/
// #region libraries
import React, { useState } from 'react';
// #endregion


// #region components
import { Badge, HeadingSubtitle, HeadingTitle } from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function ListSummary({
	title = '',
	subtitle = '',
	label = '',
	icon,
	symbol = '',
	color = colorsApp.blue,
	opened = false,
	children,
	theme = ''
}) {
	// #region hooks & others
	const [isOpen, setIsOpen] = useState(opened);
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<details
			open={opened}
			className={`${styles.list} theme-${appliedTheme}`}
		>
			<summary
				className={styles.list_summary}
				onClick={() => setIsOpen(prev => !prev)}
			>
				{(icon || symbol) &&
					<div className={styles.list_icon}>
						<Badge
							color={color}
							icon={icon}
							symbol={symbol}
							size={24}
							rounded
							pill
						/>
					</div>
				}

				<div className={styles.list_main}>
					<div className={styles.list_main_title}>
						{title &&
							<p className={styles.list_title}>
								{title}
							</p>
						}

						{subtitle &&
							<p className={styles.list_subtitle}>
								{subtitle}
							</p>
						}

						{label &&
							<p className={styles.list_label}>
								{label}
							</p>
						}
					</div>

					<div className={styles.list_arrow}>
						{isOpen ?
							<span className="material-symbols-outlined">
								expand_less
							</span>
							:
							<span className="material-symbols-outlined">
								expand_more
							</span>
						}
					</div>
				</div>
			</summary>

			<div className={styles.list_wrap}>
				{children}
			</div>
		</details >
	);
	// #endregion
}

export { ListSummary };