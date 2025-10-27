'use client';
/* 
	ATOMS - CONTROL SWITCH
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
import { useInputValue } from 'hooks';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function ControlSwitch({
	name = '',
	value,
	handler,
	disabled = false,
	theme = ''
}) {
	// #region hooks & others
	const {
		inChecked,
		handlerChecked,
	} = useInputValue({
		checked: value,
		handler: handler,
	});


	const disabledStyle = disabled ? styles.disabled : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region main UI
	return (
		<label className={`${styles.control} theme-${appliedTheme} ${disabledStyle}`}>
			<input
				className={styles.control_element}
				name={name}
				type='checkbox'
				checked={value !== undefined ? value : inChecked}
				onChange={handlerChecked}
				disabled={disabled}
			/>

			<span className={styles.control_slider} />
		</label>
	);
	// #endregion
}

export { ControlSwitch };