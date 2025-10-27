'use client';
/* 
	ORGANISMS - TIMELINE WRAP
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { Badge, BadgeBullet } from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
import { STYLE_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


function TimelineXWrap({
	aspect = STYLE_ENUM.FIRST,
	color = colorsApp.blue,
	icon = '',
	symbol = '',
	label = '',
	first = false,
	end = false,
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
		<div className={`${styles.element}`}>
			<div className={styles.element_side}>
				{aspect != STYLE_ENUM.FIRST &&
					<div
						className={`${styles.element_line} ${styles.element_line__up}`}
						style={{ backgroundColor: `${first ? 'transparent' : color}` }}
					/>
				}

				<div>
					{aspect === STYLE_ENUM.FIRST &&
						<BadgeBullet
							color={color}
						/>
					}

					{aspect === STYLE_ENUM.SECOND &&
						<Badge
							color={color}
							icon={icon}
							symbol={symbol}
							label={label}
							size={18}
							pill
							rounded
						/>
					}
				</div>

				<div
					className={`${styles.element_line} ${styles.element_line__down}`}
					style={{ backgroundColor: `${end ? 'transparent' : color}` }}
				/>
			</div>


			<div className={styles.element_main}>
				{children}
			</div>
		</div>
	);
	// #endregion
}

export { TimelineXWrap };