
'use client';
/*
	ORGANISMS - TIMELINE | SKELETON
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
import { useThemeStore } from 'context/__core__';
// #endregion


function NavigatorTimelineSkeleton({ vertical = false, theme = '' }) {
	// #region hooks & others
	const elements = Array(8).fill('');

	const verticalStyle = vertical ? styles.vertical : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.time} theme-${appliedTheme}`}>
			<div className={`${styles.time_wrap} ${verticalStyle}`}>
				<div className={`${styles.time_left} ${verticalStyle}`}>
					<button className={styles.time_button}>
						<span className='material-symbols-outlined'>
							{vertical ? 'keyboard_arrow_up' : 'arrow_left'}
						</span>
					</button>

					<button className={styles.time_button}>
						<span className='material-symbols-outlined'>
							{vertical ? 'keyboard_arrow_up' : 'arrow_left'}
						</span>
					</button>
				</div>


				<div className={`${styles.time_main} ${verticalStyle}`}>
					<div className={`${styles.time_scroll} ${verticalStyle}`}>
						<div className={`${styles.time_years} ${verticalStyle}`}>
							{elements?.map((_, i) => (
								<Skeleton width={32} key={i} />
							))}
						</div>
					</div>
					<div className={`${styles.time_scroll} ${verticalStyle}`}>
						<div className={`${styles.time_months} ${verticalStyle}`}>
							{elements?.map((_, i) => (
								<Skeleton width={32} key={i} />
							))}
						</div>
					</div>
				</div>


				<div className={`${styles.time_right} ${verticalStyle}`}>
					<button className={styles.time_button}>
						<span className='material-symbols-outlined'>
							{vertical ? 'keyboard_arrow_down' : 'arrow_right'}
						</span>
					</button>

					<button className={styles.time_button}>
						<span className='material-symbols-outlined'>
							{vertical ? 'keyboard_arrow_down' : 'arrow_right'}
						</span>
					</button>
				</div>
			</div>
		</div >
	);
	// #endregion
}

export { NavigatorTimelineSkeleton };
