'use client';
/*
	ATOMS - INPUT NUMBER
*/
// #region libraries
import React from 'react';
import Image from 'next/image';
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
import {
	useInputValue,
	useValidations
} from 'hooks';
// #endregion


// #region styles
import styles from '../styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function InputNumber({
	name = '',
	label = '',
	value,
	defaultValue = 0,
	handler,
	icon,
	symbol = '',
	size = 24,
	help = '',
	placeholder = 'placeholder',
	int = false,
	bold = false,
	required = false,
	disabled = false,
	validate = { min: 0, max: 10, step: 0.5 },
	theme = '',
}) {
	// #region hooks & others
	const {
		inValue,
		handlerNewNumber,
	} = useInputValue({
		value: value,
		defaultValue: defaultValue,
		validateNumbers: validate,
		handler: handler,
	});


	const {
		handlerEval,
		actualHint,
	} = useValidations({
		name: label,
		validateNumbers: validate,
		required: required,
	});


	const _handleChangeInput = (e) => {
		/* 	only for abstract the method of changeValue */
		let value = e.target.value.trim();
		/* round number if int is true */
		if (int) value = Math.round(value);

		handlerNewNumber(value);
		handlerEval(value);
	};

	const boldStyle = bold && styles.bold;
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
			className={`${styles.input} theme-${appliedTheme} ${logStyle} ${disabledStyle}`}
		>
			<p className={`${styles.input_title} ${boldStyle}`}>
				{label}
			</p>


			<div className={styles.input_main}>
				<div className={styles.input_symbol}>
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

				<input
					className={styles.input_element}
					type='number'
					name={name}
					placeholder={placeholder}
					value={value !== undefined ? value : inValue}
					onChange={_handleChangeInput}
					disabled={disabled}
					required={required}
					step={validate.step}
				/>
			</div>


			{help && !actualHint.label &&
				<Hint
					label={help}
					theme={appliedTheme}
					disabled={disabled}
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

export { InputNumber };
