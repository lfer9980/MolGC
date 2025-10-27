'use client';
/* 
	ATOMS - CONTROL RADIO
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


function ControlRadio({
	name = '',
	label = '',
	handler,
	selected = false,
	disabled = false,
	theme = ''
}) {
	// #region hooks & others
	const disabledStyle = disabled ? styles.disabled : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.control} theme-${appliedTheme} ${disabledStyle}`}>
			<input
				className={styles.control_element}
				name={name}
				type='radio'
				defaultChecked={selected}
				onChange={() => handler && handler(label)}
				disabled={disabled}
			/>
		</div>
	);
	// #endregion
}

export { ControlRadio };