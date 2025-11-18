'use client';
/*
	ATOMS - INPUT AUTH LOGIN
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
// #endregion


// #region hooks
import { useInputValue } from 'hooks';
// #endregion


// #region styles
import styles from '../styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function InputLogin({
	name = '',
	label = '',
	value,
	handler,
	icon,
	symbol = '',
	size = 24,
	help = '',
	placeholder = '',
	bold = false,
	disabled = false,
	control = false,
	visible = false,
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

	const [visibility, setVisibility] = useState(visible);

	/* change visibility */
	const _handleVisibility = () => setVisibility(!visibility);

	/* 	only for abstract the method of changeValue */
	const _handleChangeInput = (e) => {
		let value = e.target.value.trim();
		handlerNewValue(value);
	};

	/* abstract delete input */
	const _handleChangeInputDelete = () => {
		handlerDeleteValue();
	};

	const boldStyle = bold ? styles.bold : '';
	const disabledStyle = disabled ? styles.disabled : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region main UI
	return (
		<label
			htmlFor={name}
			className={`${styles.input}  theme-${appliedTheme} ${disabledStyle}`}
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
						{control &&
							<span
								className='material-symbols-outlined'
								style={{ fontSize: size * 0.8 }}
								onClick={_handleVisibility}
							>
								{visibility ? 'visibility' : 'visibility_off'}
							</span>
						}

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


			{help &&
				<Hint
					label={help}
					help
					theme={appliedTheme}
					disabled={disabled}
				/>
			}
		</label>
	);
	// #endregion
}

export { InputLogin };
