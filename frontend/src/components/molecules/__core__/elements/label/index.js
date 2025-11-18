'use client';
/*
	MOLECULES - ELEMENT LABEL
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
import { colorsApp } from 'lib/utils';
import { selectStyle, STYLE_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function ElementLabel({
	aspect = STYLE_ENUM.FIRST,
	title = '',
	subtitle = '',
	label = '',
	href = '',
	symbol = '',
	color = colorsApp.blue,
	children,
	bold = false,
	newTab = false,
	line = false,
	disabled = false,
	center = false,
	theme = '',
}) {
	// #region hooks & others
	const target = newTab ? '_blank' : '';
	const aspectStyle = selectStyle(aspect, styles);

	const lineStyle = line ? styles.line : '';
	const boldStyle = bold ? styles.bold : '';
	const disabledStyle = disabled ? styles.disabled : '';
	const centerStyle = center ? styles.center : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.element} theme-${appliedTheme} ${disabledStyle} ${centerStyle}`}>
			<div className={`${styles.element_title_wrap} ${boldStyle}`}>
				{symbol &&
					<Badge
						symbol={symbol}
						color={color}
						size={24}
						pill
						rounded
					/>
				}

				<p className={styles.element_title}>
					{title}
				</p>
			</div>


			{subtitle &&
				<p
					className={`${styles.element_subtitle} ${aspectStyle}`}
					style={{ color: color }}
				>
					{subtitle}
				</p>
			}


			{href ?
				<Link
					href={href}
					className={`${styles.element_link} ${aspectStyle} ${lineStyle}`}
					target={target}
				>
					{label || children}
				</Link>
				:
				<div>
					{(label || children) &&
						<div className={`${styles.element_label} ${aspectStyle} ${lineStyle}`}>
							{label || children}
						</div>
					}
				</div>
			}
		</div >
	);
	// #endregion
}

export { ElementLabel };
