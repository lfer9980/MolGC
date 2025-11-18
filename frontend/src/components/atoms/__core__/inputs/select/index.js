'use client';
/*
    ATOMS - INPUT SELECT
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
import { useInputSelect } from './useSelect';
// #endregion


// #region hooks
// #endregion


// #region styles
import styles from '../styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function InputSelect({
	name = '',
	label = '',
	value,
	handler,
	help = '',
	placeholder = 'placeholder',
	options = [],
	bold = false,
	required = false,
	disabled = false,
	theme = ''
}) {
	// #region hooks & others
	const {
		dropRef,
		inValue,
		opened,
		handlerValue,
		handleToggleDrop,
	} = useInputSelect({
		label: label,
		value: value,
		handler: handler,
		disabled: disabled,
		required: required,
	});


	const openStyle = opened ? styles.opened : '';
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

			<div className={styles.input_wrap}>
				<div
					className={`${styles.input_drop} ${openStyle}`}
					ref={dropRef}
					onClick={(e) => {
						e.preventDefault();
						handleToggleDrop();
					}}
				>
					<div className={styles.input_drop_main_select}>
						<input
							className={styles.input_element}
							type='text'
							name={name}
							placeholder={placeholder}
							value={value !== undefined ? value : inValue}
							disabled={disabled}
							required={required}
							readOnly
						/>

						{opened ?
							<span className='material-symbols-outlined'>expand_less</span>
							:
							<span className='material-symbols-outlined'>expand_more</span>
						}
					</div>

					{opened &&
						<div className={styles.input_drop_selection}>
							{options.map((item, i) => (
								<div
									key={`${item}+${i}`}
									className={styles.input_drop_selection_item}
									onClick={(e) => {
										e.preventDefault();
										handlerValue(item);
										handleToggleDrop();
									}}
								>
									<p>{item}</p>
								</div>
							))}
						</div>
					}
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

export { InputSelect };
