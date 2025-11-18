'use client';
/*
	ATOMS - INPUT HINTS
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
import { selectLogStyle, STYLE_LOG_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


function Hint({
	label = '',
	state = STYLE_LOG_ENUM.NONE,
	help = false,
	disabled = false,
	icon = true,
	theme = '',
}) {
	// #region hooks & others
	const helpStyle = help && styles.help;
	const logStyle = selectLogStyle(state, styles);
	const disabledStyle = disabled ? styles.disabled : '';
	// #endregion

	// #region theme
	const appliedTheme = theme;
	// #endregion


	// #region main UI
	return (
		<>
			{label &&
				<div className={`${styles.hint} theme-${appliedTheme}`}>
					<p className={`${styles.hint_main} ${logStyle} ${helpStyle} ${disabledStyle}`}>
						{icon &&
							<span className='material-symbols-outlined'>
								{state}
							</span>
						}
						{label}
					</p>
				</div>
			}
		</>
	);
	// #endregion
}

export { Hint };
