'use client';
/*
	ATOMS - INPUT AUTH CONFIRM
*/
// #region libraries
import React, { useState } from 'react';
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


function InputPasswordConfirm({
	name = '',
	label = '',
	value,
	confirmValue = '',
	handler,
	icon,
	symbol = 'key',
	size = 24,
	placeholder = 'confirm password',
	bold = false,
	disabled = false,
	theme = '',
}) {
	// #region hooks & others
	const {
		inValue,
		handlerNewValue,
		handlerDeleteValue,
	} = useInputValue({
		value: value,
		handler: handler,
	});


	const {
		actualHint,
		handlerHint,
		handlerRequiredValues,
	} = useValidations({
		name: label,
		validateProperty: 'matchPassword'
	});


	const [visibility, setVisibility] = useState(false);

	/* change visibility */
	const _handleVisibility = () => setVisibility(!visibility);


	const _handleChangeInput = (e) => {
		/* 	only for abstract the method of changeValue */
		let value = e.target.value.trim();

		if (value === confirmValue) handlerHint('done');
		else handlerHint('error');

		handlerNewValue(value);
	};

	const _handleChangeInputDelete = () => {
		/* abstract delete input */
		handlerDeleteValue();
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
					type={visibility ? 'text' : 'password'}
					name={name}
					placeholder={placeholder}
					value={value !== undefined ? value : inValue}
					onChange={_handleChangeInput}
					disabled={disabled}
				/>


				{value || inValue && !disabled &&
					<div className={styles.input_icon}>
						<span
							className='material-symbols-outlined'
							style={{ fontSize: size * 0.8 }}
							onClick={_handleVisibility}
						>
							{visibility ? 'visibility' : 'visibility_off'}
						</span>

						<span
							className='material-symbols-outlined'
							style={{ fontSize: size * 0.8 }}
							onClick={_handleChangeInputDelete}
						>
							close
						</span>
					</div>
				}
			</div>


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

export { InputPasswordConfirm };
