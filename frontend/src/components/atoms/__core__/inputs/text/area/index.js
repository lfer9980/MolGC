'use client';
/*
	ATOMS - INPUT TEXTAREA
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
import { selectLogStyle } from 'lib/helpers';
// #endregion


// #region hooks
import { useArea } from './useArea';
// #endregion


// #region styles
import styles from '../../styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function InputTextarea({
	name = '',
	label = '',
	value,
	handler,
	maxChar = 250,
	height = 100,
	help = '',
	placeholder = '',
	bold = false,
	required = false,
	upperCase = false,
	disabled = false,
	theme = '',
}) {
	// #region hooks & others
	const {
		inValue,
		actualHint,
		count,
		handleChangeValue,
	} = useArea({
		value: value,
		handler: handler,
		maxChar: maxChar,
		required: required,
		upperCase: upperCase,
		label: label,
	});


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
			<div className={styles.input_title_wrap}>
				<p className={`${styles.input_title} ${boldStyle}`}>
					{label}
				</p>

				<p className={styles.input_count}>
					{`${count} / ${maxChar}`}
				</p>
			</div>


			<div className={styles.input_main}>
				<textarea
					className={styles.input_element}
					type='text'
					name={name}
					placeholder={placeholder}
					value={value !== undefined ? value : inValue}
					onChange={handleChangeValue}
					disabled={disabled}
					required={required}
					style={{ height: height }}
				/>
			</div>


			{help && !actualHint.label &&
				<Hint
					label={help}
					help
					theme={appliedTheme}
					disabled={disabled}
				/>
			}


			{actualHint &&
				<div className={styles.input_hints}>
					<Hint
						label={actualHint.label}
						state={actualHint.log}
						theme={appliedTheme}
						disabled={disabled}
					/>
				</div>
			}
		</label >
	);
	// #endregion
}

export { InputTextarea };
