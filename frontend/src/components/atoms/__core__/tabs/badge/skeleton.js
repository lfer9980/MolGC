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


function TabBadgeSkeleton({ size }) {
	// #region hooks & others
	// #endregion


	// #region theme
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.tab}`}>
			<Skeleton width={size * 1.6} height={size * 1.6} circle />
			<Skeleton width={size * 1.6} height={'1.2rem'}  />
		</div>
	);
	// #endregion
}

export { TabBadgeSkeleton };