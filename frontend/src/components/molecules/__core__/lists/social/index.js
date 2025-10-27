'use client';
/* 
	MOLECULES - LIST SOCIAL
*/
// #region libraries
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
// #endregion


// #region components
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


function ListSocial({
	elements = [],
	size = 48,
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
		<nav className={`${styles.list} theme-${appliedTheme}`}>
			<ul className={styles.list_main}>
				{elements?.map((item, i) => (
					<li
						key={i}
						className={styles.list_element}
					>
						<Link
							href={`https://www.${item?.href}`}
							target='_blank'
						>
							<Image
								src={`/icons/social/${item?.name}${appliedTheme === 'dark' ? '_wh' : ''}.svg`}
								width={size}
								height={size}
								alt={item?.name}
								className={styles.list_image}
							/>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
	// #endregion
}

export { ListSocial };