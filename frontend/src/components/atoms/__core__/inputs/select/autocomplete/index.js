'use client';
/* 
	ATOMS - INPUT SELECT AUTOCOMPLETE
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
// #endregion


// #region hooks
import { useInputValue } from 'hooks';
// #endregion


// #region styles
import styles from '../../styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function InputSelectAutocomplete({
	name = '',
	label = '',
	value,
	handler,
	help = '',
	placeholder = '',
	options = [{ key: '', value: '' }],
	bold = false,
	required = false,
	disabled = false,
	theme = ''
}) {
	// #region hooks & others
	const {
		inValue,
		handlerNewValue,
	} = useInputValue({
		value: value,
		handler: handler,
	});


	const _handlerNewValue = (event) => {
		let newValue = event.target.value;
		handlerNewValue(newValue);
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
			<p className={`${styles.input_title} ${boldStyle}`}>
				{label}
			</p>


			<div className={styles.input_wrap}>
				<div className={styles.input_drop}>
					<div className={styles.input_drop_main_select}>
						<input
							className={styles.input_element}
							list={name}
							value={value !== undefined ? value : inValue}
							placeholder={placeholder}
							onChange={_handlerNewValue}
							disabled={disabled}
							required={required}
						/>

						<datalist
							id={name}
							className={styles.input_drop_selection}
						>
							{options.map((item, i) => (
								<option
									key={`${item}+${i}`}
									value={item?.key}
									className={styles.input_drop_selection_item}
								>
									{item?.value}
								</option>
							))}
						</datalist>
					</div>
				</div>
			</div>


			{help &&
				<Hint
					label={help}
					theme={appliedTheme}
					disabled={disabled}
					help
				/>
			}
		</label >
	);
	// #endregion
}

export { InputSelectAutocomplete };