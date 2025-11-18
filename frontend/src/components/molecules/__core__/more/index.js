'use client';
/*
	MOLECULES - MORE
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { Loader, LOADER_ENUM } from 'components/atoms';
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


function More({
	label = '',
	handler,
	symbol = 'south',
	help = false,
	line = true,
	loading = false,
	theme = ''
}) {
	// #region hooks & others
	const handlerMore = () => handler && handler();
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	if (loading) return (
		<div className={styles.more_main}>
			<Loader type={LOADER_ENUM.SPINNER} number={1} />
		</div>
	);
	// #endregion


	// #region main UI
	return (
		<div
			className={`${styles.more} theme-${appliedTheme}`}
			onClick={handlerMore}
		>
			{help &&
				<span className={`${styles.more_symbol} material-symbols-outlined`}>
					{symbol}
				</span>
			}

			<div className={styles.more_main}>
				{line && <div className={styles.more_line} />}

				<p className={styles.more_label}>
					{label.toUpperCase()}
				</p>

				{line && <div className={styles.more_line} />}
			</div>
		</div>
	);
	// #endregion
}

export { More };
