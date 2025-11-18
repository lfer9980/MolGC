'use client';
/*
	MOLECULES LIST SCHEDULE | SKELETON
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


function ListScheduleSkeleton({ theme = '' }) {
	// #region hooks & others
	// #endregion


	// #region theme
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.list} ${styles[theme]}`}>
			<div className={styles.list_symbol}>
				<Skeleton width={'4.8rem'} height={'4.8rem'} circle />
			</div>


			<div className={styles.list_summary}>
				<label className={styles.list_summary_main}>
					<div className={styles.list_summary_resume}>
						<Skeleton width={'6.4rem'} />
						<Skeleton width={'50%'} />
						<Skeleton className={styles.list_label} width={'75%'} />
					</div>

					<Skeleton width={'4.8rem'} height={'2.4rem'} />
				</label>


				<div className={styles.list_call}>
					<div className={styles.list_call_element}>
						<div className={styles.list_call_element_main}>
							<Skeleton width={'15rem'} height={'4.8rem'} />
							<Skeleton width={'15rem'} height={'4.8rem'}/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
	// #endregion
}

export { ListScheduleSkeleton };
