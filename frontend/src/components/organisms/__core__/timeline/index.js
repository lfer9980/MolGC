'use client';
/*
	ORGANISMS - TIMELINE X
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { TimelineXWrap } from './__wrap__';
// #endregion


// #region assets
// #endregion


// #region utils
import { STYLE_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


function TimelineX({
	aspect = STYLE_ENUM.FIRST,
	elements = [],
	children,
}) {
	// #region hooks & others
	// #endregion


	// #region theme
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.timeline}`}>
			<div className={styles.timeline_main}>
				{elements?.map((item, i) => (
					<TimelineXWrap
						key={i}
						aspect={aspect}
						color={item?.color}
						icon={item?.icon}
						symbol={item?.symbol}
						label={item?.label}
						first={i === 0}
						end={i === elements.length - 1}
					>
						{typeof children === 'function' ? children(item) : children}
					</TimelineXWrap>
				))}
			</div>
		</div>
	);
	// #endregion
}

export { TimelineX };
