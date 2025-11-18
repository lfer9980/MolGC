'use client';
/*
	ATOMS - INPUT PIN
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
import { selectLogStyle, STYLE_LOG_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
import { useInputPin } from './usePin';
// #endregion


// #region styles
import styles from '../styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function InputPin({
	name = '',
	label = '',
	handler,
	help = '',
	size = 4,
	confirmValue = '',
	bold = false,
	disabled = false,
	theme = '',
}) {
	// #region hooks & others
	const {
		pinRefs,
		inValue,
		actualRegex,
		actualHint,
		handlerNewValue,
		handlerKeyDownPin,
	} = useInputPin({
		label: label,
		handler: handler,
		confirmValue: confirmValue,
		size: size,
		disabled: disabled,
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
			<p className={`${styles.input_title} ${boldStyle}`}>
				{label}
			</p>


			<div className={styles.input_wrap}>
				{inValue && inValue.map((item, i) => (
					<input
						key={i}
						className={styles.input_pin}
						name={name}
						type='text'
						value={item}
						onChange={(e) => handlerNewValue(i, e)}
						onKeyDown={(e) => handlerKeyDownPin(i, e)}
						maxLength={1}
						ref={(ref) => (pinRefs.current[i] = ref)}
						disabled={disabled}
						required
					/>
				))}
			</div>


			{help && !actualHint.label && !actualRegex.length != 0 &&
				<Hint
					label={help}
					help
					theme={appliedTheme}
					disabled={disabled}
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

export { InputPin };
