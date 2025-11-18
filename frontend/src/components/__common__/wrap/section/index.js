'use client';
/*
	COMMON - WRAP - SECTION
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


function WrapSection({
	margin = false,
	padding = false,
	children,
}) {
	// #region hooks & others
	const marginStyle = margin ? styles.margin : '';
	const paddingStyle = padding ? styles.padding : '';
	// #endregion


	// #region theme
	// #endregion


	// #region main UI
	return (
		<section className={`${styles.wrap} ${marginStyle} ${paddingStyle}`}>
			{children}
		</section>
	);
	// #endregion
}

export { WrapSection };
