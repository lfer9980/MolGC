'use client';
/*
	ATOMS - INPUT PHONE
*/
// #region libraries
import React from 'react';
import Image from 'next/image';
// #endregion


// #region components
import { Hint } from 'components/atoms';
import { FlagImage } from 'react-international-phone';
// #endregion


// #region assets
// #endregion


// #region utils
import { selectLogStyle } from 'lib/helpers';
// #endregion


// #region hooks
import { useInputPhone } from './usePhone';
// #endregion


// #region styles
import styles from '../styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function InputPhone({
	name = '',
	label = '',
	value,
	handler,
	icon,
	symbol = '',
	size = 24,
	help = '',
	countries = ['mx', 'us'],
	bold = false,
	required = false,
	disabled = false,
	theme = '',
}) {
	// #region hooks & others
	const {
		dropRef,
		filteredCountries,
		inValue,
		actualHint,
		opened,
		country,
		setCountry,
		handleToggleDrop,
		handlePhoneValueChange,
		handleChangeInputDelete,
		handleKeyUp,
		handleKeyDown,
	} = useInputPhone({
		label: label,
		value: value,
		handler: handler,
		countries: countries,
		disabled: disabled,
		required: required,
	});


	const boldStyle = bold ? styles.bold : '';
	const openStyle = opened ? styles.opened : '';
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
			className={`${styles.input}  theme-${appliedTheme} ${disabledStyle} ${logStyle}`}
		>
			<p className={`${styles.input_title} ${boldStyle}`}>
				{label}
			</p>

			<div className={styles.input_wrap}>
				<div
					className={`${styles.input_drop} ${openStyle}`}
					onClick={handleToggleDrop}
					ref={dropRef}
				>
					<div className={styles.input_drop_main}>
						{country &&
							<FlagImage
								iso2={country.iso2}
								size={24}
								alt={`codigo de telefono de ${country.name}`}
							/>
						}

						{opened ?
							<span className='material-symbols-outlined'>expand_less</span>
							:
							<span className='material-symbols-outlined'>expand_more</span>
						}
					</div>

					{opened &&
						<div className={styles.input_drop_selection}>
							{filteredCountries.map((item, i) => (
								<div
									key={`${item}+${i}`}
									className={styles.input_drop_selection_item}
									onClick={() => {
										setCountry(item[1]);
										handleToggleDrop();
									}}
								>
									<FlagImage
										iso2={item[1]}
										size={24}
										alt={`codigo de telefono seleccionado de ${country}`}
									/>
									<p>{item[0]}</p>
									<p>+{item[2]}</p>
								</div>
							))}
						</div>
					}
				</div>


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
						type='text'
						name={name}
						placeholder={`+${country.dialCode}   ${country.format}`}
						value={value !== undefined ? value : inValue}
						onChange={handlePhoneValueChange}
						disabled={disabled}
						required={required}
						onKeyUp={handleKeyUp}
						onKeyDown={handleKeyDown}
					/>


					{value || inValue && !disabled &&
						<div
							className={styles.input_icon}
							onClick={handleChangeInputDelete}
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
			</div>


			{help && !actualHint &&
				<Hint
					label={help}
					theme={appliedTheme}
					disabled={disabled}
					help
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

export { InputPhone };
