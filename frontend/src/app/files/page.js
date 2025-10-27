// ESTADO: En desarrollo
'use client';
/* 
ROUTES - FILES
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { Loader, LOADER_ENUM } from 'components/atoms';
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


export default function Files({ }) {
	// #region hooks & others
	/* TODO: implement check if there any files, if not, redirect to upload files automatic */
	// #endregion

	//#region main UI
	return (
		<div className={styles.page}>
			<div className={styles.page_main}>
				<Loader
					type={LOADER_ENUM.DOTS}
					number={29}
					size={32}
					label='Cargando...'
				/>
			</div>
		</div>
	);
	//#endregion
};