'use client';
/* 
	ATOMS - INPUT RADIO
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { Hint, ControlRadio } from 'components/atoms';
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


function InputRadio({
	name = '',
	label = '',
	value = '',
	handler,
	options = [],
	help = '',
	bold = false,
	disabled = false,
	theme = '',
}) {
	// #region hooks & others
	const {
		inValue,
		handlerNewValue,
	} = useInputValue({
		handler: handler,
		defaultValue: value,
	});


	const boldStyle = bold ? styles.bold : '';
	const disabledStyle = disabled ? styles.disabled : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.input}  theme-${appliedTheme} ${disabledStyle}`}>
			<p className={`${styles.input_title} ${boldStyle}`}>
				{label}
			</p>


			<div className={styles.input_wrap}>
				{options && options.map((item, i) => (
					<label
						key={i}
						className={styles.input_radio}
					>
						<ControlRadio
							name={name}
							disabled={disabled}
							selected={value === item}
							label={item}
							handler={handlerNewValue}
						/>

						<p
							className={styles.input_radio_item}
							style={{ fontWeight: `${inValue === item ? '700' : '400'}` }}
						>
							{item}
						</p>
					</label>
				))}
			</div>


			{help &&
				<Hint
					label={help}
					help
					theme={appliedTheme}
					disabled={disabled}
				/>
			}
		</div >
	);
	// #endregion
}

export { InputRadio };