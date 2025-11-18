'use client';
/*
	ATOMS - INPUT SEARCH
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { ButtonPill } from 'components/atoms';
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


function InputSearch({
	name = '',
	label = '',
	value,
	handler,
	handlerSearch,
	size = 24,
	placeholder = 'Busca aqui...',
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

	const _handleChangeInput = (e) => {
		/* 	only for abstract the method of changeValue */
		let value = e.target.value.trim();
		handlerNewValue(value);
	};

	const _handleChangeInputDelete = () => {
		/* abstract delete input */
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
			className={`${styles.input} theme-${appliedTheme} ${disabledStyle}`}
		>
			{label &&
				<p className={`${styles.input_title} ${boldStyle}`}>
					{label}
				</p>
			}

			<div className={styles.input_wrap}>
				<div className={styles.input_main}>
					<input
						className={styles.input_element}
						type='text'
						name={name}
						placeholder={placeholder}
						value={value !== undefined ? value : inValue}
						onChange={_handleChangeInput}
						disabled={disabled}
					/>


					{value || inValue && !disabled &&
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

				<div className={styles.input_search}>
					<ButtonPill
						symbol='search'
						size={size}
						handler={handlerSearch}
						disabled={disabled}
					/>
				</div>
			</div>
		</label >
	);
	// #endregion
}

export { InputSearch };
