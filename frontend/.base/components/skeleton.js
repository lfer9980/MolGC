'use client';
/* 
	TYPE - ELEMENT | SKELETON
*/
// #region libraries
import React from 'react';
import Skeleton from 'react-loading-skeleton';
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


function ComponentSkeleton() {
	// #region hooks & others
	// #endregion


	// #region theme
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.class}`}>
			<Skeleton width={300} height={30} style={{ marginBottom: '10px' }} />
			<Skeleton width={30} height={30} circle />
		</div>
	);
	// #endregion
}

export { ComponentSkeleton };