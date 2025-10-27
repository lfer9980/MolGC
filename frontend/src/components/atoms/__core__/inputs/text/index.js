'use client';
/* 
	ATOMS - INPUT TEXT
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
import { STYLE_LOG_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
import { useInputValue, useValidations } from 'hooks';
// #endregion


// #region styles
import styles from '../styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion

function InputText({
	name = '',
	label = '',
	value,
	defaultValue = '',
	handler,
	icon,
	symbol = '',
	size = 24,
	maxChar = 1000,
	help = '',
	placeholder = 'placeholder',
	bold = false,
	required = false,
	upperCase = false,
	disabled = false,
	validate,
	theme = '',
}) {
	// #region hooks & others
	const {
		inValue,
		handlerNewValue,
		handlerDeleteValue,
	} = useInputValue({
		value: value,
		defaultValue: defaultValue,
		handler: handler,
	});


	const {
		actualRegex,
		handlerRegex,
		handlerRequiredValues,
	} = useValidations({
		name: label,
		validateRegex: validate,
		required: required,
	});


	const _handleChangeInput = (e) => {
		/* 	only for abstract the method of changeValue */
		let value = e.target.value;
		/*  change to uppercase */
		if (upperCase) value = value.toUpperCase();

		/* limit the max ammount of chars */
		if (value.length <= maxChar) {
			handlerRegex(value);
			handlerNewValue(value);
		};
	};

	const _handleChangeInputDelete = () => {
		/* abstract delete input */
		handlerDeleteValue();
		handlerRequiredValues(true);
	};

	const boldStyle = bold ? styles.bold : '';
	const disabledStyle = disabled ? styles.disabled : '';
	const logStyle = actualRegex.length != 0 ? styles.error : '';
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
				<div className={styles.input_symbol}>
					{icon ?
						<Image
							src={icon}
							width={size}
							height={size}
							className={styles.icon}
							alt={label}
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
					type='text'
					name={name}
					placeholder={placeholder}
					value={value !== undefined ? value : inValue}
					onChange={_handleChangeInput}
					disabled={disabled}
					required={required}
				/>


				{(value || inValue) && !disabled &&
					<div
						className={styles.input_icon}
						onClick={_handleChangeInputDelete}
					>
						<span
							className='material-symbols-outlined'
							style={{ fontSize: size * 0.8 }}
						>
							close
						</span>
					</div>
				}
			</div>


			{help && !actualRegex.length != 0 &&
				<Hint
					label={help}
					help
					theme={appliedTheme}
					disabled={disabled}
				/>
			}


			{actualRegex.length != 0 &&
				<div className={styles.input_hints}>
					{actualRegex.map((item) => (
						<Hint
							key={item}
							label={item}
							state={STYLE_LOG_ENUM.ERROR}
							theme={appliedTheme}
							disabled={disabled}
						/>
					))
					}
				</div>
			}
		</label >
	);
	// #endregion
}

export { InputText };