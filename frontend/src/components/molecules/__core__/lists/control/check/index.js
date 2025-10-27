'use client';
/* 
	MOLECULES - LIST CONTROL CHECK
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { ListControlCheckSkeleton } from './skeleton';
import { Badge, ControlCheck } from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
// #endregion


// #region hooks
import { useInputValue } from 'hooks';
// #endregion


// #region styles
import styles from '../styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function ListControlCheck({
	name = '',
	title = '',
	subtitle = '',
	label = '',
	icon = '',
	symbol = '',
	size = 24,
	color = colorsApp.blue,
	value,
	handler,
	children,
	disabled = false,
	loading = false,
	theme = ''
}) {
	// #region hooks & others
	const {
		inChecked,
		handlerChecked
	} = useInputValue({
		checked: value,
		handler: handler,
	});


	const disabledStyle = disabled ? styles.disabled : '';
	const unselectedStyle = !inChecked ? styles.unselected : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion

	// #region skeletons
	if (loading) return (
		<ListControlCheckSkeleton
			sizeBadge={size}
			appliedTheme={appliedTheme}
		/>
	)
	// #endregion


	// #region main UI
	return (
		<article className={`${styles.list} theme-${appliedTheme} ${disabledStyle} ${unselectedStyle}`}>
			{icon || symbol &&
				<div className={styles.list_badge}>
					<Badge
						symbol={symbol}
						icon={icon}
						size={size}
						color={!inChecked ? colorsApp.disabled : color}
						disabled={disabled}
						pill
					/>
				</div>
			}

			<label className={styles.list_main}>
				<div className={styles.list_main_item}>
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

					{children}
				</div>

				<div className={styles.list_main_control}>
					<ControlCheck
						name={name}
						value={inChecked}
						handler={handlerChecked}
						disabled={disabled}
					/>
				</div>
			</label>
		</article>
	);
	// #endregion
}

export { ListControlCheck };