'use client';
/* 
	MOLECULES - ELEMENT DOWNLOAD
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
import { colorsApp } from 'lib/utils';
// #endregion


// #region hooks
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function ElementDownload({
	label = '',
	size = '',
	ext = '',
	close = false,
	maxLen = 15,
	handler,
	theme = ''
}) {
	// #region hooks & others
	const mbLen = 1024;
	const newSize = Math.ceil(size / mbLen, 0);
	const newLabel = `${label.length >= maxLen ? `${label?.slice(0, maxLen)}...` : label}${ext ? `.${ext}` : ''}`;

	const closeStyle = close ? styles.close : '';
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
			className={`${styles.element} theme-${appliedTheme} ${closeStyle}`}
			onClick={() => !close && handler && handler()}
		>
			<div className={styles.element_main}>
				<Badge
					symbol={'attach_file'}
					color={colorsApp.odd_inverse}
					size={24}
					pill
					rounded
				/>

				<p className={styles.element_label}>
					{newLabel}
				</p>
			</div>

			<div className={styles.element_text}>
				<span className={styles.element_size}>
					{`${newSize} Kb`}
				</span>

				<span
					className={`material-symbols-outlined ${styles.element_text_symbol}`}
					style={{ color: close ? colorsApp.red : '' }}
					onClick={() => close && handler()}
				>
					{`${close ? 'close' : ' download'}`}
				</span>
			</div>
		</div>
	);
	// #endregion
}

export { ElementDownload };