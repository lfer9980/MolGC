'use client';
/*
	ATOMS - BUTTON COLOR
*/
// #region libraries
import React from 'react';
import Image from 'next/image';
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


function ButtonColor({
	type = 'button',
	label = '',
	icon = '',
	symbol = '',
	color = colorsApp.transparent,
	disabled = false,
	arrow = false,
	line = false,
	center = false,
	outline = false,
	size = 18,
	handler,
	theme = '',
}) {
	// #region hooks & others

	const {
		inColor,
	} = useColorComponent({
		color: color,
		disabled: disabled
	});

	const centerStyle = center ? styles.center : '';
	const disabledStyle = disabled ? styles.disabled : '';
	const handlerEvent = () => !disabled && handler && handler();
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;

	const colorStyle = (appliedTheme === 'dark' || color !== colorsApp.transparent) ? styles.white : styles.black;
	// #endregion


	// #region main UI
	return (
		<button
			className={`${styles.button} ${disabledStyle} ${colorStyle} ${centerStyle}`}
			style={{
				backgroundColor: `${!outline ? inColor : 'transparent'}`,
				border: `${outline ? `1px solid ${inColor}` : ''}`,
				color: `${outline ? inColor : ''}`,
			}}
			onClick={handlerEvent}
			type={type}
			disabled={disabled}
		>
			{line &&
				<div
					className={styles.line}
					style={{ borderColor: colorStyle }}
				/>
			}

			{icon &&
				<Image
					src={icon}
					width={size}
					height={size}
					className={styles.icon}
					alt={alt}
				/>
			}

			{symbol &&
				<span
					className={`material-symbols-outlined ${styles.symbol}`}
					style={{ fontSize: size }}
				>
					{symbol}
				</span>
			}

			{label &&
				<p className={styles.button_label}>
					{label}
				</p>
			}

			{arrow &&
				<span
					className={`material-symbols-outlined ${styles.arrow}`}
				>
					arrow_right_alt
				</span>
			}
		</button>
	);
	// #endregion
}

export { ButtonColor };
