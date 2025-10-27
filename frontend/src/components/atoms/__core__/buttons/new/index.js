'use client';
/* 
	ATOMS - BUTTON NEW
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
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


function ButtonNew({
	symbol = 'add',
	size = 24,
	active = false,
	disabled = false,
	handler,
}) {
	// #region hooks & others
	const handlerEvent = () => !disabled && handler && handler();

	const activeStyle = active ? styles.active : styles.inActive;
	const disabledStyle = disabled ? styles.disabled : '';
	// #endregion


	// #region theme
	// #endregion


	// #region main UI
	return (
		<button
			className={`${styles.button} ${disabledStyle} ${activeStyle}`}
			style={{
				color: `#FFF`,
				backgroundColor: `${active ? colorsApp.red : colorsApp.blue}`,
				padding: size / 3
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
		</button>
	);
	// #endregion
}

export { ButtonNew };