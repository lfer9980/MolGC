'use client';
/*
	ATOMS - BUTTON NAV
*/
// #region libraries
import React from 'react';
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


function ButtonNav({
	label = '',
	symbol = '',
	align = 'center',
	inverse = false,
	disabled = false,
	selected = false,
	direction = 'asc',
	sorting = false,
	handler,
	handlerReset,
	theme = '',
}) {
	// #region hooks & others
	const selectedStyle = selected ? styles.selected : '';
	const disabledStyle = disabled ? styles.disabled : '';
	const inverseStyle = inverse ? styles.white : '';
	const iconsStyle = align === 'right' ? styles.left : styles.right;
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region main UI
	return (
		<div
			className={`${styles.button} ${disabledStyle} theme-${appliedTheme} ${inverseStyle} ${selectedStyle}`}
			onClick={(event) => {
				event.stopPropagation();
				event.preventDefault();
				handler && handler();
			}}
		>
			<p
				className={styles.label}
				style={{ justifyContent: align }}
			>
				{symbol &&
					<span className={`material-symbols-outlined ${styles.symbol}`}>
						{symbol}
					</span>
				}

				{label}
			</p>

			<div className={`${styles.button_icons} ${iconsStyle}`}>
				{sorting &&
					<span className={`material-symbols-outlined ${styles.arrow}`}>
						{direction === 'asc' ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
					</span>
				}

				{selected &&
					<span
						className={`material-symbols-outlined ${styles.close}`}
						onClick={(event) => {
							event.stopPropagation();
							event.preventDefault();
							handlerReset && handlerReset();
						}}
					>
						close
					</span>
				}
			</div>
		</div >
	);
	// #endregion
}

export { ButtonNav };
