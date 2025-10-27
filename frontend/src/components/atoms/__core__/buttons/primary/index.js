'use client';
/* 
	ATOMS - BUTTON PRIMARY
*/
// #region libraries
import React from 'react';
import Image from 'next/image';
// #endregion


// #region components
import { Loader, LOADER_ENUM } from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
import { selectStyle, STYLE_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
import { useActivateAnimation } from 'hooks';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function ButtonPrimary({
	type = 'button',
	aspect = STYLE_ENUM.FIRST,
	label = '',
	icon = '',
	symbol = '',
	size = 18,
	disabled = false,
	arrow = false,
	line = false,
	animate = false,
	loading = false,
	handler,
	theme = ''
}) {
	// #region hooks & others
	const aspectStyle = selectStyle(aspect, styles);
	const disabledStyle = disabled ? styles.disabled : '';

	const { animationBase, animation } = useActivateAnimation({ animationName: 'animate__pulse' });

	const handlerEvent = () => {
		if (!loading && !disabled) {
			handler && handler();
		}
	}
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;

	const loadingStyle = loading ? styles.loading : '';
	// #endregion


	// #region main UI
	return (
		<button
			type={type}
			className={`${styles.button} theme-${appliedTheme} ${disabledStyle} ${aspectStyle} ${animate && `${animationBase} ${animation}`} ${loadingStyle}`}
			onClick={handlerEvent}
		>
			{!loading ?
				<>
					{aspect === STYLE_ENUM.THIRD && line &&
						<div className={styles.line} />
					}

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


					<p className={styles.button_label}> {label} </p>

					{arrow &&
						<span
							className={`material-symbols-outlined ${styles.arrow}`}
							style={{ fontSize: size }}
						>
							arrow_right_alt
						</span>
					}
				</>
				:
				<Loader
					size={28}
					type={LOADER_ENUM.DOTS}
					number={3}
					theme={aspect === STYLE_ENUM.FIRST ? 'dark' : ''}
				/>
			}
		</button>
	);
	// #endregion
}

export { ButtonPrimary };