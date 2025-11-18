'use client';
/*
	ATOMS - BUTTON DRAG
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
import { STYLE_DIR_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context';
// #endregion


function ButtonDrag({
	type = 'button',
	label = '',
	icon = '',
	symbol = '',
	direction = STYLE_DIR_ENUM.RIGHT,
	size = 18,
	color = colorsApp.white,
	handler,
	theme = ''
}) {
	// #region hooks & others
	const directionStyle = direction === STYLE_DIR_ENUM.RIGHT ? styles.right : styles.left;
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region main UI
	return (
		<button
			type={type}
			className={`${styles.button} theme-${appliedTheme} ${directionStyle}`}
			style={{ color: color }}
			onClick={handler}
		>
			{direction === STYLE_DIR_ENUM.LEFT &&
				<div className={styles.icon}>
					{icon &&
						<Image
							src={icon}
							width={size}
							height={size}
							className={styles.icon}
							alt={label}
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
				</div>
			}


			<p className={styles.button_label}> {label} </p>


			{direction === STYLE_DIR_ENUM.RIGHT &&
				<div className={styles.icon}>
					{icon &&
						<Image
							src={icon}
							width={size}
							height={size}
							className={styles.icon}
							alt={label}
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
				</div>
			}
		</button >
	);
	// #endregion
}

export { ButtonDrag };
