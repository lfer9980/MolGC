'use client';
/*
	ORGANISMS - TIMERX | SKELETON
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


function TimerXSkeleton({
	controls = true,
	mini = false,
}) {
	// #region hooks & others

	const miniStyle = mini ? styles.mini : '';
	// #endregion


	// #region theme
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.timer}`}>
			<div className={`${styles.timer_main}`}>
				<div className={`${styles.timer_digit} ${miniStyle}`}>
					<Skeleton width={mini ? 30 : 60} height={'100%'} />
				</div>

				<div className={`${styles.timer_digit} ${miniStyle}`}>
					<Skeleton width={mini ? 30 : 60} height={'100%'} />
				</div>

				<div className={`${styles.timer_digit} ${miniStyle}`}>
					<Skeleton width={mini ? 30 : 60} height={'100%'} />
				</div>
			</div>


			{!mini &&
				<div className={styles.timer_title}>
					<Skeleton width={100} height={'100%'} />
				</div>
			}


			{controls &&
				<div className={styles.timer_actions}>
					<div className={styles.timer_control}>
						<div className={styles.timer_button}>
							<Skeleton width={40} height={40} />
						</div>
					</div>

					<div className={styles.timer_control}>
						<div className={styles.timer_button}>
							<Skeleton width={40} height={40} />
						</div>
					</div>
				</div>
			}
		</div>
	);
	// #endregion
}

export { TimerXSkeleton };
