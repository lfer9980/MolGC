'use client';
/*
	ATOMS - BADGE DROPDOWN
*/
// #region libraries
import React, { useRef, useState } from 'react';
import Image from 'next/image';
// #endregion


// #region components
import { BadgeBullet } from '../bullet';
import { FlagImage } from 'react-international-phone';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
import { selectDirStyle, STYLE_DIR_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
import {
	useInputValue,
	useColorComponent,
	useClickOutside,
} from 'hooks';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function BadgeDropdown({
	value,
	handler,
	options = [{ flag: "", icon: "", symbol: "", label: "" }],
	color,
	size = 24,
	width = 100,
	direction = STYLE_DIR_ENUM.BOTTOM,
	disabled = false,
	padding = true,
	theme = '',
}) {
	// #region hooks & others
	const ref = useRef(null);

	const [opened, setOpened] = useState(false);
	const handlerToggleDropdown = () => setOpened(!opened);

	const {
		inColor,
	} = useColorComponent({
		color: color,
		disabled: disabled,
	});

	const {
		inValue,
		handlerNewValue,
	} = useInputValue({
		value: value,
		handler: handler,
	});

	useClickOutside({
		ref: ref,
		handler: () => setOpened(false),
		enabled: opened,
	});


	const directionStyle = selectDirStyle(styles, direction);

	const actualValue = value !== undefined ? value : inValue;

	const symbolStyle = color ? styles.white : styles.black;
	const paddingStyle = padding ? styles.padding : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;

	const colorStyle = appliedTheme === 'dark' ? colorsApp.white : '';
	// #endregion


	// #region main UI
	return (
		<div
			ref={ref}
			className={`${styles.badge} theme-${appliedTheme} ${paddingStyle}`}
			style={{
				backgroundColor: `${disabled ? 'transparent' : inColor}`,
				minWidth: width,
			}}
		>
			<div
				className={`${styles.badge_summary} ${symbolStyle}`}
				style={{ color: `${disabled ? inColor : ''}` }}
				onClick={handlerToggleDropdown}
			>
				<div className={styles.badge_summary_wrap}>
					{actualValue?.flag &&
						<FlagImage
							iso2={actualValue.flag}
							size={size}
							alt={`${actualValue?.label}`}
						/>
					}

					{actualValue?.icon &&
						<Image
							src={actualValue.icon}
							width={size}
							height={size}
							className={styles.icon}
							alt={actualValue?.alt}
						/>
					}

					{actualValue?.symbol &&
						<span
							className={`material-symbols-outlined ${styles.badge_symbol}`}
							style={{
								fontSize: size,
								color: colorStyle
							}}
						>
							{actualValue.symbol}
						</span>
					}

					{actualValue?.label &&
						<span className={`${styles.badge_label}`}>
							{actualValue.label}
						</span>
					}
				</div>

				<div
					className={styles.badge_drop}
					style={{ color: color ? colorStyle : 'var(--primary)' }}
				>
					<span className='material-symbols-outlined'>
						{opened ?
							`${(direction === 'LEFT' || direction === 'RIGHT') ? 'keyboard_arrow_right' : 'keyboard_arrow_up'}`
							:
							`${(direction === 'LEFT' || direction === 'RIGHT') ? 'keyboard_arrow_right' : 'keyboard_arrow_down'}`
						}
					</span>
				</div>
			</div>


			{opened &&
				<div className={`${styles.badge_main} ${directionStyle}`}>
					{options.map((item, i) => (
						<div
							key={i}
							className={styles.badge_main_item}
							onClick={() => {
								handlerNewValue(item);
								handlerToggleDropdown();
							}}
						>
							<div className={styles.badge_main_item_wrap}>
								{item?.flag &&
									<FlagImage
										iso2={item.flag}
										size={size}
										alt={`lenguaje seleccionado de ${item?.label}`}
									/>
								}

								{item?.icon &&
									<Image
										src={item.icon}
										width={size}
										height={size}
										className={styles.icon}
										alt={item?.alt}
									/>
								}

								{item?.symbol &&
									<span
										className={`material-symbols-outlined ${styles.badge_symbol}`}
										style={{
											fontSize: size,
											color: colorStyle
										}}
									>
										{item.symbol}
									</span>
								}

								{item?.label &&
									<span className={`${styles.badge_label}`}>
										{item.label}
									</span>
								}
							</div>

							<BadgeBullet
								color={actualValue?.name === item?.name ? colorsApp.blue : colorsApp.transparent}
								pill
							/>
						</div>
					))}
				</div>
			}
		</ div >
	);
	// #endregion
}

export { BadgeDropdown };
