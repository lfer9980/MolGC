
'use client';
/* 
		MOLECULES - LIST CONTROL SWITCH | SKELETON
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
import styles from '../styles.module.scss';
// #endregion


function ListControlSwitchSkeleton({
	sizeBadge,
	appliedTheme,
}) {
	// #region hooks & others
	// #endregion


	// #region theme
	// #endregion


	// #region main UI
	return (
		<article className={`${styles.list} theme-${appliedTheme}`}>
			<div className={styles.list_badge}>
				<Skeleton width={sizeBadge * 1.3} height={sizeBadge * 1.3} />
			</div>

			<div className={styles.list_main}>
				<div className={styles.list_main_item}>
					<Skeleton width={'4.8rem'} height={'1.6rem'} />
					<Skeleton width={'6.4rem'} height={'1.6rem'} />
					<Skeleton width={'100%'} height={'1.6rem'} />
				</div>

				<div className={styles.list_main_control}>
					<Skeleton
						width={'1.6rem'}
						height={'1.6rem'}
					/>
				</div>
			</div>
		</article>
	);
	// #endregion
}

export { ListControlSwitchSkeleton };