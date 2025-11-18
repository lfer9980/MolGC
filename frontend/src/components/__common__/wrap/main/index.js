'use client';
/*
	COMMON - WRAP - MAIN
*/

// #region libraries
import React from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


export const WRAP_MAIN_DIRECTION = {
	COLUMN: 'column',
	ROW: 'row',
};

function WrapMain({
	direction = WRAP_MAIN_DIRECTION.COLUMN,
	padding = false,
	margin = false,
	full = false,
	center = false,
	children,
}) {
	// #region hooks & others
	const paddingStyle = padding ? styles.padding : '';
	const marginStyle = margin ? styles.margin : '';
	const fullStyle = full ? styles.full : '';
	const centerStyle = center ? styles.center : '';
	const directionStyle = direction === WRAP_MAIN_DIRECTION.COLUMN ? styles.column : styles.row
	// #endregion


	// #region theme
	// #endregion


	// #region main UI
	return (
		<main className={`${styles.wrap} ${directionStyle} ${paddingStyle} ${marginStyle} ${fullStyle} ${centerStyle}`}>
			{children}
		</main>
	);
	// #endregion
}

export { WrapMain };
