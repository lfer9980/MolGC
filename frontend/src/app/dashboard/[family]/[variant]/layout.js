/* 
	ROUTES - DASHBOARD / FAMILY / VARIANT | LAYOUT
*/
'use client';
// #region libraries
import React from 'react';
import { useRouter } from 'next/navigation';
// #endregion


// #region components
import { WrapMain, WrapSection } from 'components/__common__';
import { ButtonPill, HeadingTitle } from 'components/atoms';
import { HeaderMolGC } from 'components/organisms';
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
import { Breadcrumbs } from 'components/molecules';
// #endregion


export default function LayoutDashboardVariant({
	children,
}) {
	// #region contexts
	// #endregion


	// #region references
	const router = useRouter();
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
		<>
			<HeaderMolGC semiTransparent />

			<WrapMain padding margin>
				<div className={styles.page_wrapper}>
					<WrapSection>
						<Breadcrumbs />
						<div className={styles.page_heading}>
							<div className={styles.page_heading_main}>
								<ButtonPill
									symbol='arrow_left_alt'
									color={colorsApp.black}
									handler={() => router.push('/dashboard')}
								/>

								<div className={styles.page_heading_head}>
									<HeadingTitle
										title='Detalle del reporte'
										theme='dark'
									/>
								</div>
							</div>
						</div>

						{children}
					</WrapSection>
				</div>
			</WrapMain >
		</>
	);
	// #endregion
};