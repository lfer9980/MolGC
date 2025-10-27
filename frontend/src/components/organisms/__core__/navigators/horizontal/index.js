'use client';
/* 
	ORNGANISMS - NAVIGATOR HORIZONTAL
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { TabRouter } from 'components/atoms';
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


function NavigatorHorizontal({
	elements = [{ icon: "", label: "", symbol: "", href: "" }],
	background = colorsApp.background_first,
	basePath = '',
	handler,
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
		<div
			className={`${styles.navigator} theme-${appliedTheme}`}
			style={{ background: background }}
		>
			<nav className={styles.navigator_wrap}>
				<ul className={styles.navigator_ul}>
					{elements?.map((item, i) => (
						<TabRouter
							key={i}
							label={item.label}
							icon={item.icon}
							symbol={item.symbol}
							href={`${basePath}${item.href}`}
							aspect={STYLE_ENUM.FIRST}
							handler={handler}
							theme={'dark'}
						/>
					))}
				</ul>
			</nav>
		</div>
	);
	// #endregion
}

export { NavigatorHorizontal };