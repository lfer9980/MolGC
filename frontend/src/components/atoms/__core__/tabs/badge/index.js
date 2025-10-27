'use client';
/* 
	ATOMS - TAB BADGE
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { TabBadgeSkeleton } from './skeleton';
import { Badge } from 'components/atoms';
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


function TabBadge({
	icon = '',
	symbol = '',
	label = '',
	size = 24,
	handler,
	color = colorsApp.blue,
	selected = false,
	loading = false,
	theme = ''
}) {
	// #region hooks & others
	const selectedStyle = selected ? styles.selected : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	if (loading) return (
		<TabBadgeSkeleton
			size={size}
		/>
	);
	// #endregion


	// #region main UI
	return (
		<div
			className={`${styles.tab} ${selectedStyle} theme-${appliedTheme}`}
			onClick={handler}
		>
			{(icon || symbol) &&
				<Badge
					icon={icon}
					symbol={symbol}
					size={size}
					color={color}
					theme={appliedTheme}
					border={!selected}
					rounded
					pill
				/>
			}

			<p className={styles.tab_label}>
				{label}
			</p>
		</div>
	);
	// #endregion
}

export { TabBadge };