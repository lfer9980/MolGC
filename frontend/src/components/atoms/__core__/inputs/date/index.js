'use client';
/* 
	ATOMS - INPUT DATE
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { Hint } from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
import { selectLogStyle, helperFormatDate } from 'lib/helpers';
// #endregion


// #region hooks
import { useDate } from './useDate';

import {
	useInputValue,
	useValidations,
} from 'hooks';
// #endregion


// #region styles
import styles from '../styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function InputDate({
	name = '',
	label = '',
	value,
	/* expected default value: 2025-02-22 */
	defaultValue = '',
	min,
	max,
	handler,
	help = '',
	bold = false,
	noPast = false,
	required = false,
	disabled = false,
	theme = '',
}) {
	// #region hooks & others
	/* check if there is a default value and put that date, else put the today date */
	const [year, month, day] = defaultValue.split('-').map(Number);
	const defaultDate = defaultValue ? helperFormatDate(new Date(year, month - 1, day)) : helperFormatDate(new Date());


	const {
		minDate,
		maxDate,
	} = useDate({
		defaultValue: defaultDate,
		min: min,
		max: max,
		noPast: noPast,
	});

	const {
		inValue,
		handlerNewValue,
	} = useInputValue({
		value: value,
		defaultValue: defaultDate,
		handler: handler,
	});


	const {
		actualHint,
		handlerRequiredValues,
	} = useValidations({
		name: label,
		required: required,
	});


	const _handleChangeInput = (e) => {
		/* 	only for abstract the method of changeValue */
		let value = e.target.value;
		handlerNewValue(value);
		handlerRequiredValues(true);
	};

	const boldStyle = bold ? styles.bold : '';
	const disabledStyle = disabled ? styles.disabled : '';
	const logStyle = actualHint ? selectLogStyle(actualHint.log, styles) : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region main UI
	return (
		<label
			htmlFor={name}
			className={`${styles.input}  theme-${appliedTheme} ${logStyle} ${disabledStyle}`}
		>
			<p className={`${styles.input_title} ${boldStyle}`}>
				{label}
			</p>


			<div className={styles.input_main}>
				<input
					className={styles.input_element}
					type='date'
					name={name}
					value={value !== undefined ? value : inValue}
					onChange={_handleChangeInput}
					disabled={disabled}
					required={required}
					min={minDate}
					max={maxDate}
				/>
			</div>


			{help && !actualHint.label &&
				<Hint
					label={help}
					disabled={disabled}
					theme={appliedTheme}
					help
				/>
			}

			{actualHint.label &&
				<div className={styles.input_hints}>
					<Hint
						label={actualHint.label}
						state={actualHint.log}
						disabled={disabled}
						theme={appliedTheme}
					/>
				</div>
			}
		</label>
	);
	// #endregion
}

export { InputDate };