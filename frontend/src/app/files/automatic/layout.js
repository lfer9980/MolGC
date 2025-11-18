'use client';
/*
	ROUTES - FILES - Automatic | LAYOUT
*/

// #region libraries
import React from 'react';
import { useRouter } from 'next/navigation';
// #endregion


// #region components
import { WrapSection } from 'components/__common__';
import { ButtonPill, HeadingTitle } from 'components/atoms';
import { Breadcrumbs } from 'components/molecules';
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


export default function LayoutFilesAuto({ children }) {
	// #region contexts
	// #endregion


	// #region references
	// #endregion


	// #region variables
	const router = useRouter();
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
		<WrapSection>
			<Breadcrumbs />

			<div className={styles.page_heading}>
				<div className={styles.page_heading_main}>
					<ButtonPill
						symbol='arrow_left_alt'
						color={colorsApp.black}
						handler={() => router.push('/files')}
					/>

					<div className={styles.page_heading_head}>
						<HeadingTitle
							symbol='precision_manufacturing'
							title='Modo Automático'
							theme='dark'
						/>
					</div>
				</div>

				<p className={styles.page_label}>
					Podemos detectar de forma automatica tus archivos. Es necesario que sigas la siguiente arquitectura.
				</p>
			</div>

			{children}
		</WrapSection>
	);
	// #endregion
};
