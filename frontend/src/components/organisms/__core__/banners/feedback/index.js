'use client';
/* 
	MOLECULES - BANNER FEEDBACK
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


function BannerFeedback({
	title = '',
	label = '',
	symbol = '',
	accent = false,
	size = 24,
	children,
}) {
	// #region hooks & others
	const accentStyle = accent ? styles.accent : '';
	// #endregion


	// #region main UI
	return (
		<article className={styles.banner}>
			{symbol &&
				<span
					className={`material-symbols-outlined ${styles.banner_symbol}`}
					style={{ fontSize: size * 2 }}
				>
					{symbol}
				</span>
			}
			<div>
				{title &&
					<h4 className={styles.banner_title}>
						{title}
					</h4>
				}

				<div className={`${styles.banner_content} ${accentStyle}`}>
					{label || children}
				</div>
			</div>
		</article >
	);
	// #endregion
}

export { BannerFeedback };