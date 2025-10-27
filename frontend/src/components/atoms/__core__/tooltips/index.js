'use client';
/* 
	ATOMS - TOOLTIP
*/
// #region libraries
import React from 'react';
import Link from 'next/link';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
import {
	selectDirStyle,
	STYLE_DIR_ENUM
} from 'lib/helpers';
// #endregion


// #region hooks
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


function Tooltip({
	label = '',
	href = '',
	direction = STYLE_DIR_ENUM.NONE,
}) {
	// #region hooks & others
	const arrowStyle = selectDirStyle(styles, direction);
	// #endregion


	// #region main UI
	return (
		<div className={styles.tooltip}>
			<div className={styles.tooltip_main}>
				{href ?
					<Link
						className={styles.tooltip_link}
						href={href}
					>
						{label}
					</Link>
					:
					<span className={`${styles.tooltip_text}`}>
						{label}
					</span>
				}
			</div>

			<div className={`${styles.tooltip_arrow} ${arrowStyle}`}>
				<span className={styles.main} />
			</div >
		</div>
	);
	// #endregion
}

export { Tooltip };