// ESTADO: En desarrollo
'use client';
/* 
	ROUTES - CONFIGURATION 
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import {
	ButtonPrimary,
	HeadingTitle,
	InputSelect
} from 'components/atoms';

import { ElementLink } from 'components/molecules';
// #endregion


// #region assets
import { ANALYSIS_OPTIONS } from 'lib/data/options/analysis';
// #endregion


// #region utils
// #endregion


// #region hooks
import { useConfiguration } from './useConfiguration';
// #endregion


// #region contexts & stores
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


export default function Configuration({ }) {
	// #region hooks & others
	const {
		analysis,
		reference,
		viewReference,
		handlerAnalysis,
		handlerReference,
	} = useConfiguration({});
	// #endregion

	//#region main UI
	return (
		<form className={styles.page}>
			<HeadingTitle
				title='Configuracion Final'
				symbol='not_started'
				label='Indica el tipo de Algoritmo y la referencia de ser necesario.'
			/>

			<div className={styles.page_section}>
				<InputSelect
					label='Tipo de Analisis'
					placeholder='Analisis Individual / Validacion Cruzada'
					options={ANALYSIS_OPTIONS}
					value={analysis}
					handler={handlerAnalysis}
					help='Tipo de analisis a ejecutar'
				/>

				{viewReference &&
					<InputSelect
						label='Referencia de analisis'
						placeholder='Elige la referencia que utilizaras para tu analisis individual'
						value={reference}
						handler={handlerReference}
						help='Referencia utilizada para el analisis individual'
					/>
				}
			</div>


			<div className={styles.page_buttons}>
				<div className={styles.page_link}>
					<ElementLink
						href='/FAQs'
						label='Documentacion y tutoriales de uso'
						symbol='help'
					/>
				</div>

				<ButtonPrimary
					symbol='not_started'
					label='Comenzar Analisis'
				/>
			</div>
		</form>
	);
	//#endregion
};