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
	Hint,
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
import { STYLE_LOG_ENUM } from 'lib/helpers';
// #endregion


export default function Configuration({ }) {
	// #region hooks & others
	const {
		config,
		viewReference,
		dispatchConfig,
		REFERENCES,
		ACTION_REDUCER_CONFIG,
		handlerStartAnalysis
	} = useConfiguration({});
	// #endregion

	//#region main UI
	return (
		<form className={styles.page}>
			<HeadingTitle
				title='Configuración Final'
				symbol='not_started'
				label='Indica el tipo de Algoritmo y la referencia de ser necesario.'
			/>

			<div className={styles.page_section}>
				<div>

					<InputSelect
						label='Tipo de Análisis'
						placeholder='Análisis Individual / Validacion Cruzada'
						options={ANALYSIS_OPTIONS}
						value={config.analysis_type}
						handler={(value) => dispatchConfig({
							type: ACTION_REDUCER_CONFIG.UPDATE,
							payload: { analysis_type: value }
						})}
						disabled
					/>
					{/* TODO: delete this warning when cross validation done */}
					<Hint
						label='Por el momento, solo está disponible el análisis individual'
						state={STYLE_LOG_ENUM.WARNING}
						theme='dark'
					/>
				</div>

				{viewReference &&
					<InputSelect
						label='Referencia de analisis'
						placeholder='Elige la referencia que utilizarás para tu análisis individual'
						value={config.reference}
						handler={(value) => dispatchConfig({
							type: ACTION_REDUCER_CONFIG.UPDATE,
							payload: { reference: value }
						})}
						options={REFERENCES}
						help='Referencia utilizada para el análisis individual'
					/>
				}
			</div>


			<div className={styles.page_buttons}>
				<div className={styles.page_link}>
					<ElementLink
						href='/docs'
						label='Documentación y tutoriales de uso'
						symbol='help'
					/>
				</div>

				<ButtonPrimary
					symbol='not_started'
					label='Comenzar Análisis'
					handler={handlerStartAnalysis}
				/>
			</div>
		</form>
	);
	//#endregion
};