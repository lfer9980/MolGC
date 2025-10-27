'use client';
/* 
	this components wraps or contain other components inside, this for mutate the original functionality and also add new features.
	NOTE: you must to pass a component or function in order to preserve HIGH ORDER FUNCTIONS PATTERN.
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
import { useHookWrapper } from './useHookWrapper';
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


function WrapperComponent(WrappedComponent) {
	// #region hooks & others
	const {

	} = useHookWrapper({

	});
	// #endregion


	// #region main UI
	return (props) => {
		return (
			<div className={styles.class}>
				<WrappedComponent {...props} />
			</div>
		);
	};
	// #endregion
}

export { WrapperComponent };