'use client';
/* 
	ORGANISMS - MENU NAVIGATE
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { MenuSection } from './__elements__/section';
import { HeadingSubtitle } from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


function MenuNav({
	title = '',
	elements = [],
}) {
	// #region hooks & others
	// #endregion


	// #region theme
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<section className={`${styles.menu}`}>
			<div className={styles.menu_title}>
				{title &&
					<HeadingSubtitle
						title={title?.toUpperCase()}
					/>
				}
			</div>

			<main className={styles.menu_main}>
				{elements?.map((item, i) => (
					<MenuSection
						key={i}
						title={item?.title}
						basePath={item?.basePath}
						elements={item.elements}
					/>
				))}
			</main>
		</section>
	);
	// #endregion
}

export { MenuNav };