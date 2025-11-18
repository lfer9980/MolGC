'use client';
/*
	ATOMS - BUTTON WRAPPER
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


function ButtonWrapper({
	direction = 'column',
	accent = false,
	children,
}) {
	// #region hooks & others
	const accentStyle = accent ? styles.accent : '';
	const directionStyle = direction === 'column' ? styles.column : styles.row;
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.hub} ${accentStyle} ${directionStyle}`}>
			{children}
		</div>
	);
	// #endregion
}

export { ButtonWrapper };
