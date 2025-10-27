'use client';
/* 
	ATOMS - LOADER BAR
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


function LoaderBar({
	progress,
	maxValue = 100,
	width = 50,
	label = '',
	state = STYLE_LOG_ENUM.INFO,
}) {
	// #region hooks & others
	const logStyle = selectLogStyle(state, styles);
	// #endregion


	// #region main UI
	return (
		<div
			className={`${styles.bar} ${logStyle}`}
			style={{ minWidth: width }}
		>
			{label &&
				<div className={styles.bar_head}>
					<p className={styles.bar_head_label}>
						{label}
					</p>

					<p className={styles.bar_head_progress}>
						{Math.round(progress)}
						<span>
							%
						</span>
					</p>
				</div>
			}

			<div className={styles.bar_wrapper}>
				<progress
					max={maxValue}
					value={progress}
					className={styles.bar_main}
				/>
			</div>
		</div>
	);
	// #endregion
}

export { LoaderBar };