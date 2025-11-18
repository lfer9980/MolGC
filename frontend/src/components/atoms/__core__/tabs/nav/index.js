'use client';
/*
	ATOMS - TABS NAV
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
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function TabNav({
	icon,
	symbol = '',
	align = 'center',
	label = 'label',
	size = 24,
	handler,
	active = false,
	theme = ''
}) {
	// #region hooks & others
	const activeStyle = active ? styles.active : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<li
			className={`${styles.tab} theme-${appliedTheme} ${activeStyle}`}
			style={{ justifyContent: align }}
			onClick={handler}
		>
			<div className={styles.tab_symbol}>
				<Badge
					icon={icon}
					symbol={symbol}
					size={size}
					disabled
					pill
				/>
			</div>

			<p className={styles.tab_label}>
				{label}
			</p>
		</li>
	);
	// #endregion
}

export { TabNav };
