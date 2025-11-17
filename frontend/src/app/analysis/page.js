// ESTADO: Completada
'use client';
/* 
	ROUTES - CONFIGURATION 
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { HeadingTitle, LoaderBar } from 'components/atoms';
import { ElementLabel } from 'components/molecules';
import { HeaderMolGC } from 'components/organisms';
import { MoleculeViewer } from 'components/templates';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
// #endregion


// #region hooks
import { useActivateAnimation } from 'hooks';
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

	const {
		animationBase,
		animation
	} = useActivateAnimation({
		animationName: 'animate__flash',
		interval: 4000,
	});
	// #endregion

	//#region main UI
	return (
		<>
			<HeaderMolGC transparent second />

			<main className={styles.page}>
				<MoleculeViewer />
			</main>

			<footer className={styles.page_footer}>
				<HeadingTitle
					title='Análisis en curso'
					label='Te avisaremos cuando esté listo...'
					symbol='account_tree'
				/>

				<div className={`${styles.page_info} ${animationBase} ${animation}`}>
					<ElementLabel
						symbol='info'
						color={colorsApp.transparent}
						title='¡Mueve la molécula con tu mouse, dando Click y arrastrando!'
					/>
				</div>

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