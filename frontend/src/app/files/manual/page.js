// ESTADO: En desarrollo
'use client';
/* 
	ROUTES - FILES - Manual
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import {
	ButtonColor,
	ButtonPrimary,
	InputText,
	LoaderBar
} from 'components/atoms';

import { ListSummary } from 'components/molecules';
import { UploadX } from 'components/organisms';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
// #endregion


// #region hooks
import { useFilesManual } from './useFilesManual';
// #endregion


// #region contexts & stores
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


export default function FilesManual({ }) {
	// #region hooks & others
	const {
		view,
		files,
		loading,
		progress,
		setFiles,
	} = useFilesManual({});
	// #endregion

	//#region main UI
	return (
		<>

			{loading ?
				<div className={styles.page_loading}>
					<div className={styles.page_loading_main}>
						<LoaderBar
							label
							progress={progress}
							maxValue={100}
						/>
					</div>

					<ButtonColor
						symbol='cancel'
						label='CANCELAR'
						color={colorsApp.red}
					/>
				</div >
				:
				<form className={styles.page_form}>
					<ListSummary
						title='Subir Archivos'
						opened={view === 0}
					>
						<UploadX
							title='Sube tu primer archivo y visualizalo aqui.'
							filesAccepted='.log,.castep,.out'
							maxFiles={20}
							files={files}
							handler={setFiles}
						/>
					</ListSummary>

					<ListSummary
						title='Clasificacion de archivos'
						opened={view === 1}
					>
						{files.length > 0 &&
							<p className={styles.page_form_files_resume}>
								{files.length} archivo(s) cargado(s)
							</p>
						}

						<div className={styles.page_form_main}>
							<InputText
								label='Algoritmo'
								value={'CASTEP'}
								help='Este valor se calcula de forma automatica.'
								theme='dark'
								disabled
							/>

							<InputText
								label='Familia'
								value={'FLUOROQUINOLES'}
								symbol='grain'
								theme='dark'
							/>

							<InputText
								label='Variante'
								value={'ciproflaxin'}
								symbol='co2'
								theme='dark'
							/>

							<InputText
								label='Funcional'
								value={'LDA + OBS'}
								theme='dark'
							/>
						</div>

						<ButtonPrimary
							label='Agregar Archivos'
							symbol='add'
						/>
					</ListSummary>
				</form>
			}
		</>
	);
	//#endregion
};