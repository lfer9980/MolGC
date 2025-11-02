// ESTADO: En desarrollo
'use client';
/* 
	ROUTES - CONFIGURATION 
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { HeadingTitle, LoaderBar } from 'components/atoms';
import { HeaderMolGC } from 'components/organisms';
import { MoleculeViewer } from 'components/templates';
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
import { useAnalysis } from './useAnalysis';
// #endregion


// #region contexts & stores
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


export default function Analysis({ }) {
	// #region hooks & others
	const {
		messages,
	} = useAnalysis({});

	// #endregion

	//#region main UI
	return (
		<>
			<HeaderMolGC transparent />

			<main className={styles.page}>
				<MoleculeViewer />
			</main>

			<footer className={styles.page_footer}>
				<HeadingTitle
					title='Analisis en curso'
					label='Te avisaremos cuando este listo...'
					symbol='account_tree'
				/>

				<LoaderBar
					label={messages.message}
					progress={messages.progress}
					maxValue={100}
				/>
			</footer>
		</>
	);
	//#endregion
};