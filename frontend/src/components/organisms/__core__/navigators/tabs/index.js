'use client';
/* 
	ORGANISMS - NAVIGATOR TABS
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { TabNav } from 'components/atoms';
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


function NavigatorTabs({
	direction = 'row',
	align = 'center',
	elements = [{ icon: '', symbol: '', label: '' }],
	center = false,
	navPos,
	handler,
	theme = ''
}) {
	// #region hooks & others
	const directionStyle = direction === 'column' ? styles.column : styles.row;
	const centerStyle = center ? styles.center : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;

	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.navigator} theme-${appliedTheme}`}>
			<nav className={`${styles.navigator_wrap}`}>
				<ul className={`${styles.navigator_ul} ${directionStyle} ${centerStyle}`}>
					{elements?.map((item, i) => (
						<TabNav
							key={i}
							icon={item?.icon}
							symbol={item?.symbol}
							label={item?.label}
							active={navPos === i}
							align={align}
							handler={() => handler && handler(i)}
						/>
					)
					)}
				</ul>
			</nav>
		</div >
	);
	// #endregion
}

export { NavigatorTabs };