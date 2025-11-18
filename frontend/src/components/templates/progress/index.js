'use client';
/*
	TEMPLATES - PROGRESS
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { NativePortal } from 'components/__common__';
import {
	Loader,
	LOADER_ENUM,
	LoaderBar
} from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


function OverlayProgress({
	isVisible,
	progress,
	total,
	message
}) {
	// #region hooks & others
	if (!isVisible) return null;
	// #endregion


	// #region theme
	const percentage = total > 0 ? Math.round((progress / total) * 100) : 0;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<NativePortal scroll>
			<div className={styles.progress}>
				<div className={styles.progress_bar}>
					<div className={styles.progress_loader}>
						<Loader
							type={LOADER_ENUM.SPINNER}
							number={7}
							size={64}
							theme='light'
						/>
					</div>

					<LoaderBar
						progress={percentage}
						maxValue={100}
						label={message}
						theme='light'
					/>
				</div>

				<p className={styles.progress_label}>
					<span style={{ color: '#3498db' }}>
						{progress}</span> de <span style={{ color: '#3498db' }}>{total}
					</span> gráficos
				</p>
			</div>
		</NativePortal >
	);
	// #endregion
}

export { OverlayProgress };
