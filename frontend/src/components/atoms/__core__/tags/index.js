'use client';
/* 
	ATOMS - TAGS
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
import { useColorComponent, useInputValue } from 'hooks';
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


function Tag({
	icon = '',
	symbol = '',
	label = '',
	color = colorsApp.blue,
	size = 24,
	handler,
	handlerClose,
	selected,
	disabled = false,
}) {
	// #region hooks & others
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
		value: selected,
		handler: handler,
	});

	const selectedStyle = selected ? styles.selected : styles.unselected;
	const disabledStyle = disabled ? styles.disabled : '';
	const symbolStyle = color ? styles.white : styles.black;
	// #endregion


	// #region main UI
	return (
		<div
			className={`${styles.tag} ${disabledStyle} ${selectedStyle} ${symbolStyle}`}
			style={{
				backgroundColor: `${(selected || inValue) ? inColor : 'transparent'}`,
				borderColor: `${!(selected || inValue) ? inColor : 'transparent'}`,
				color: `${!(selected || inValue) ? inColor : ''}`,
			}}
			onClick={(event) => {
				event.preventDefault();
				event.stopPropagation();
				!disabled && handlerNewValue(selected === undefined ? !inValue : !selected)
			}}
		>
			<div
				className={`${styles.tag_wrapper}`}
			>
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
						className='material-symbols-outlined'
						style={{ fontSize: size }}
					>
						{symbol}
					</span>
				}

				<p className={`${styles.label} p1`}>
					{label}
				</p>
			</div>


			{
				handlerClose &&
				<div className={`${styles.close}`}>
					<span
						className={`material-symbols-outlined`}
						style={{ fontSize: size }}
						onClick={(event) => {
							event.preventDefault();
							event.stopPropagation();
							!disabled && handlerClose()
						}}
					>
						close
					</span>
				</div>
			}
		</ div >
	);
	// #endregion
}

export { Tag };