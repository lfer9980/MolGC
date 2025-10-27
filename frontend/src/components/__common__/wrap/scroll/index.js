'use client';
/* 
	COMMON - WRAP - SCROLL
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


function WrapScroll({
	padding = false,
	margin = false,
	height = 350,
	children
}) {
	// #region hooks & others
	const paddingStyle = padding ? styles.padding : '';
	const marginStyle = margin ? styles.margin : '';
	// #endregion


	// #region theme
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.wrap} ${paddingStyle} ${marginStyle}`}>
			<div
				className={styles.wrap_child}
				style={{ height: height }}
			>
				{children}
			</div>
		</div>
	);
	// #endregion
}

export { WrapScroll };