'use client';
/* 
	MOLECULES - BREADCRUMBS
*/
// #region libraries
import React from 'react';
import Link from 'next/link';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
import { useBread } from './useBread';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function Breadcrumbs({ theme = '' }) {
	// #region hooks & others
	const {
		names,
		crumbs,
	} = useBread({});

	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region main UI
	return (
		<div className={styles.breadcrumb_wrap}>
			<nav className={`${styles.breadcrumb} theme-${appliedTheme}`}>
				<ul className={styles.breadcrumb_label}>
					{crumbs?.map((_, i, arr) => {
						const routeTo = `/${arr.slice(0, i + 1).join('/')}`;
						const last = i === arr.length - 1;

						return (
							<li key={i} className={styles.breadcrumb_item}>
								<Link
									href={routeTo}
									className={styles.breadcrumb_link}
								>
									{names[i]}
								</Link>

								{!last && <span className={styles.breadcrumb_divisor}>/</span>}
							</li>
						);
					})}
				</ul>
			</nav>
		</div>
	);
	// #endregion
}

export { Breadcrumbs };