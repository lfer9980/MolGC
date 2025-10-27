'use client';
/* 
	ATOMS - BUTTON PILL
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
// #endregion


// #region hooks
import { useColorComponent } from 'hooks';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function ButtonPill({
	label = '',
	symbol = '',
	color = colorsApp.blue,
	size = 24,
	padding = 0,
	disabled = false,
	handler,
	theme = ''
}) {
	// #region hooks & others
	const handlerEvent = () => !disabled && handler && handler();

	const {
		inColor
	} = useColorComponent({
		color: color,
		disabled: disabled,
	});

	const disabledStyle = disabled ? styles.disabled : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;

	const colorStyle = appliedTheme === 'dark' ? colorsApp.white : colorsApp.blue;
	// #endregion


	// #region main UI
	return (
		<button
			className={`${styles.pill} ${disabledStyle}`}
			style={{
				color: `${inColor != 'transparent' ? '#FFF' : colorStyle}`,
				backgroundColor: `${inColor}`,
				padding: padding || size / 2
			}}
			onClick={handlerEvent}
			type={'button'}
		>
			{symbol &&
				<span
					className={`material-symbols-outlined`}
					style={{ fontSize: size }}
				>
					{symbol}
				</span>
			}
			{label &&
				<p className={styles.pill_label}>
					{label}
				</p>
			}
		</button>
	);
	// #endregion
}

export { ButtonPill };