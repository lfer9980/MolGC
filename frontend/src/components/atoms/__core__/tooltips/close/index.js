'use client';
/*
	ATOMS - TOOLTIP CLOSE
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
import { useTooltip } from '../useTooltip';
import { useColorComponent } from 'hooks';
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


function TooltipClose({
	icon = '',
	symbol = '',
	label = '',
	alt = '',
	color = colorsApp.blue,
	size = 24,
	disabled = false,
	handler,
	handlerClose,
}) {
	// #region hooks & others
	const {
		inColor,
	} = useColorComponent({
		color: color,
		disabled: disabled,
	});

	const {
		show,
		visible,
		handleShowLabel
	} = useTooltip({});


	const symbolStyle = color ? styles.white : styles.black;
	const disabledStyle = disabled ? styles.disabled : '';
	// #endregion


	// #region main UI
	return (
		<div
			className={`${styles.tooltip} ${symbolStyle} ${disabledStyle}`}
			style={{ backgroundColor: `${inColor}` }}
			onMouseEnter={() => !disabled && handleShowLabel(true)}
			onMouseLeave={() => !disabled && handleShowLabel(false)}
			onClick={(event) => {
				event.preventDefault();
				event.stopPropagation();
				!disabled && handler && handler()
			}}
		>
			<div className={styles.tooltip_symbol}>
				{icon ?
					<Image
						src={icon}
						width={size}
						height={size}
						className={styles.icon}
						alt={alt}
					/>
					:
					<>
						{symbol &&
							<span
								className='material-symbols-outlined'
								style={{ fontSize: size }}
							>
								{symbol}
							</span>
						}
					</>
				}
			</div>


			{show &&
				<div
					className={`${styles.tooltip_main} ${visible ? styles.rollIn : styles.rollOut}`}
					style={{ backgroundColor: `${inColor}` }}
				>
					<p className={styles.tooltip_label}>
						{label}
					</p>

					{handlerClose &&
						<span
							className={`${styles.tooltip_close} material-symbols-outlined`}
							style={{ fontSize: size }}
							onClick={(event) => {
								event.preventDefault();
								event.stopPropagation();
								!disabled && handlerClose();
							}}
						>
							close
						</span>
					}
				</div>
			}
		</div>
	);
	// #endregion
}

export { TooltipClose };
