'use client';
/* 
	COMMON - THEME
*/

// #region libraries
import React from 'react';
// #endregion


// #region components
import { ControlTheme } from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
import { THEME_ENUM } from 'context/__core__/theme/__data__';
// #endregion


// #region hooks
import { useThemeStore } from 'context/__core__';
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


function ToggleTheme({
	fixed = false,
	label = '',
}) {
	// #region hooks & others
	const fixedStyle = fixed ? styles.fixed : '';
	// #endregion


	// #region theme
	const { theme, handlerTheme } = useThemeStore();
	// #endregion


	// #region main UI
	return (
		<article className={`${styles.toggle} ${fixedStyle}`}>
			<label className={styles.toggle_main}>
				<ControlTheme
					value={theme === THEME_ENUM.LIGHT}
					handler={(e) => handlerTheme(e ? THEME_ENUM.LIGHT : THEME_ENUM.DARK)}
				/>
			</label>

			{label &&
				<p className={`${styles.toggle_title}`}>
					{label}
					<span className='material-symbols-outlined'>
						arrow_right_alt
					</span>
				</p>
			}
		</article>
	);
	// #endregion
}

export { ToggleTheme };