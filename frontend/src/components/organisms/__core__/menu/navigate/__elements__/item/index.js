'use client';
/* 
	ORGANISMS - MENU NAVIGATE ITEM
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
import { MENU_ASIDE_STYLE } from 'lib/helpers';
// #endregion


// #region hooks
// #endregion


// #region styles
import styles from '../styles.module.scss';
import { useMenuItem } from './useMenuItem';
// #endregion


function MenuItem({
	data = {},
	type = MENU_ASIDE_STYLE.FIRST,
	basePath = '/',
	handler,
}) {
	// #region hooks & others
	const {
		active,
		scrollTo,
	} = useMenuItem({
		label: data?.label,
	});

	const activeStyle = active ? styles.active : '';
	// #endregion


	// #region theme
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	if (data?.scroll) return (
		<div
			className={`${styles.section_nav_scroll} ${activeStyle}`}
			onClick={(event) => {
				scrollTo(event, data?.label);
				handler && handler();
			}}
		>
			<span className={`${styles.section_scroll_symbol} material-symbols-outlined`}>
				{type === MENU_ASIDE_STYLE.SECOND ? 'arrow_right' : ''}
				{type === MENU_ASIDE_STYLE.THIRD ? 'keyboard_double_arrow_right' : ''}
			</span>

			<span className={styles.section_scroll_label}>
				{data?.label}
			</span>
		</div>
	);


	if (data?.href) return (
		<Link
			href={`${basePath}${data?.href}`}
			className={`${styles.section_nav_link} ${activeStyle}`}
			onClick={handler}
		>
			<span className={`${styles.section_link_symbol} material-symbols-outlined`}>
				{type === MENU_ASIDE_STYLE.SECOND ? 'arrow_right' : ''}
				{type === MENU_ASIDE_STYLE.THIRD ? 'keyboard_double_arrow_right' : ''}
			</span>

			<span className={styles.section_link_label}>
				{data?.label}
			</span>
		</Link>
	);


	return (
		<div
			className={`${styles.section_nav_item} ${activeStyle}`}
			onClick={handler}
		>
			<span className={`${styles.section_item_symbol} material-symbols-outlined`}>
				{type === MENU_ASIDE_STYLE.SECOND ? 'arrow_right' : ''}
				{type === MENU_ASIDE_STYLE.THIRD ? 'keyboard_double_arrow_right' : ''}
			</span>

			<span className={styles.section_item_label}>
				{data?.label}
			</span>
		</div>
	);
	// #endregion
}

export { MenuItem };