'use client';
/* 
	ATOMS - INPUT SELECT BADGE
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { Hint, Badge, BadgeBullet } from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
import { splitString } from 'lib/helpers';
import { colorsApp } from 'lib/utils';
// #endregion


// #region hooks
import { useInputSelect } from '../useSelect';
// #endregion


// #region styles
import styles from '../../styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function InputSelectBadge({
	name = '',
	label = '',
	value,
	handler,
	help = '',
	placeholder = 'placeholder',
	options = [{ key: '| |', value: '' }],
	bold = false,
	required = false,
	disabled = false,
	theme = ''
}) {
	// #region hooks & others
	const {
		dropRef,
		keyColor,
		keySymbol,
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
		badge: true,
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
						{keyColor &&
							<>
								{keySymbol ?
									<Badge
										color={colorsApp[keyColor]}
										symbol={keySymbol}
										size={18}
										rounded
										pill
									/>
									:
									<BadgeBullet
										color={colorsApp[keyColor]}
										size={12}
										pill
									/>
								}
							</>
						}

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
							{options.map((item, i) => {
								const splitted = splitString(item.key, '|');

								return (
									<div
										key={`${item}+${i}`}
										className={styles.input_drop_selection_item}
										onClick={(e) => {
											e.preventDefault();
											handlerValue(item.key);
											handleToggleDrop();
										}}
									>
										{splitted[2] ?
											<Badge
												color={colorsApp[splitted[1]]}
												symbol={splitted[2]}
												size={18}
												pill
												rounded
											/>
											:
											<>
												{splitted[1] &&
													<BadgeBullet
														color={colorsApp[splitted[1]]}
														size={12}
														pill
													/>
												}
											</>
										}

										<p>{item.value}</p>
									</div>
								);
							})}
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

export { InputSelectBadge };