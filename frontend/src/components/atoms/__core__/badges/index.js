'use client'
/*
	ATOMS - BADGES
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


function Badge({
	icon = '',
	symbol = '',
	label = '',
	alt = '',
	color,
	size = 32,
	pill = false,
	rounded = false,
	border = false,
	noPadding = false,
	disabled = false,
	theme = '',
}) {
	// #region hooks & others
	const {
		inColor,
	} = useColorComponent({
		color: color,
		disabled: disabled,
	});

	const pillStyle = pill ? styles.pill : '';
	const borderStyle = border ? styles.border : '';
	const roundedStyle = rounded ? styles.rounded : '';
	const symbolStyle = !border && color ? styles.white : styles.black;
	const paddingStyle = (!noPadding && pill) ? styles.padding : '';
	// #endregion

	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;

	const colorStyle = appliedTheme === 'dark' ? colorsApp.white : border ? inColor : '';
	// #endregion

	// #region main UI
	return (
		<div
			className={`${styles.badge} ${roundedStyle} ${pillStyle} ${borderStyle} ${paddingStyle} theme-${appliedTheme}`}
			style={{
				borderColor: `${border ? inColor : ''}`,
				backgroundColor: `${disabled ? 'transparent' : !border ? inColor : ''}`,
				width: !pill ? size : '',
				height: !pill ? size : '',
				padding: !pill ? size * .25 : '',
			}}
		>
			<div
				className={`${styles.badge_main} ${symbolStyle}`}
				style={{ color: `${disabled ? inColor : ''}` }}
			>
				{icon &&
					<Image
						src={icon}
						width={size}
						height={size}
						className={`${styles.icon} ${symbolStyle}`}
						alt={alt}
					/>
				}

				{symbol &&
					<span
						className={`material-symbols-outlined ${styles.badge_symbol}`}
						style={{
							fontSize: size,
							color: colorStyle
						}}
					>
						{symbol}
					</span>
				}

				{label &&
					<span
						className={`${styles.badge_label}`}
						style={{ color: colorStyle }}
					>
						{label}
					</span>
				}
			</div>
		</ div >
	);
	// #endregion
}

export { Badge };