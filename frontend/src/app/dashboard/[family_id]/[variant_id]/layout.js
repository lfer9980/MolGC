/* 
ROUTES - DASHBOARD / FAMILY / VARIANT | LAYOUT
*/
'use client';
// #region libraries
import React from 'react';
// #endregion


// #region components
import { ButtonPill, HeadingTitle } from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


export default function LayoutDashboardVariant({
	children,
}) {
	// #region contexts
	// #endregion


	// #region references
	// #endregion


	// #region variables
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region states
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	// #endregion


	// #region effects
	// #endregion


	// #region others
	// #endregion


	// #region theme
	// #endregion


	// #region main
	return (
		<section className={styles.page}>
			<div className={styles.page_heading}>
				<div className={styles.page_heading_main}>
					<ButtonPill
						symbol='arrow_left_alt'
						color={colorsApp.black}
						handler={() => router.push('/files')}
					/>

					<div className={styles.page_heading_head}>
						<HeadingTitle
							symbol='bar_chart'
							title='Reporte por Variante'
							theme='dark'
						/>
					</div>
				</div>
			</div>

			{children}
		</section>
	);
	// #endregion
};