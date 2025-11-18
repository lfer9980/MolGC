'use client';
/*
	this is the way of usage of a Wrapper, here you will find the WrappedComponent
	NOTE: in this case, you export as default the Wrapper and also Wrapped, you need to be careful cause the default export tends to generate some issues.
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
import { WrapperComponent } from './wrapper';
// #endregion


function WrappedComponent({ }) {
	// #region hooks & others
	// #endregion


	// #region main
	return (
		<div className={styles.class}>
		</div>
	);
	// #endregion
}


export default WrapperComponent(WrappedComponent);
