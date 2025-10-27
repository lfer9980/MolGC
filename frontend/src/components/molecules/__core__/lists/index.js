'use client';
/* 
	MOLECULES - LIST
*/
// #region libraries
import React from 'react';
import Link from 'next/link';
// #endregion


// #region components
import {
	Badge,
	BadgeBullet,
	ButtonPill
} from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
import { STYLE_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


const _selectElement = (aspect, label, color) => {
	/* thsi selects the element to render inside the list */
	switch (aspect) {
		case STYLE_ENUM.FIRST:
			return (
				<p className={styles.list_call_item}
					style={{ color: color }}
				>
					<span
						className='material-symbols-outlined'
						style={{
							fontSize: '3.2rem',
							color: color,
						}}
					>
						keyboard_arrow_right
					</span>
				</p>
			);

		case STYLE_ENUM.SECOND:
			return (
				<p className={styles.list_call_item}
					style={{ color: color }}
				>
					{label}
					<span
						className='material-symbols-outlined'
						style={{
							fontSize: '3.2rem',
							color: color,
						}}
					>
						keyboard_arrow_right
					</span>
				</p>
			);

		case STYLE_ENUM.THIRD:
			return (
				<BadgeBullet
					color={color}
				/>
			);

		case STYLE_ENUM.FOURTH:
			return (
				<ButtonPill
					color={color}
					label={label}
				/>
			);

		default:
			return <></>;
	}
};


function List({
	aspect = STYLE_ENUM.FIRST,
	title = '',
	subtitle = '',
	label = '',
	labelButton = '',
	href = '',
	icon = '',
	symbol = '',
	color = colorsApp.blue,
	border = false,
	children,
	handler,
	theme = ''
}) {
	// #region hooks & others
	/* selects element rendered on UI */
	const elementForList = _selectElement(aspect, labelButton, color);
	const borderStyle = border ? styles.border : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<article className={`${styles.list} theme-${appliedTheme}`}>
			{(icon || symbol) &&
				<div className={styles.list_symbol}>
					<Badge
						icon={icon}
						symbol={symbol}
						size={24}
						color={color}
						pill
					/>
				</div>
			}

			<div className={`${styles.list_wrap} ${borderStyle}`}>
				<div className={`${styles.list_summary_main}`}>
					{title &&
						<p className={styles.list_title}>
							{title}
						</p>
					}

					{subtitle &&
						<p
							className={styles.list_subtitle}
							style={{ color: color }}
						>
							{subtitle.toUpperCase()}
						</p>
					}

					{(label || children) &&
						<div className={styles.list_main}>
							{label || children}
						</div>
					}
				</div>


				{aspect != STYLE_ENUM.NONE &&
					<div
						className={styles.list_call}
						onClick={handler}
					>
						{href ?
							<Link
								href={href}
							>
								{elementForList}
							</Link>
							:
							<>
								{elementForList}
							</>
						}
					</div>
				}
			</div>
		</article>
	);
	// #endregion
}

export { List };