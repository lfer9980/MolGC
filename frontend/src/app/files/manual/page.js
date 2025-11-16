// ESTADO: Completada
'use client';
/* 
	ROUTES - FILES - Manual
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import {
	ButtonPrimary,
	HeadingTitle,
	InputText,
	LoaderBar
} from 'components/atoms';

import { ListSummary } from 'components/molecules';
import { UploadX } from 'components/organisms';
// #endregion


// #region assets
// #endregion


// #region utils
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
		loading,
		files,
		metadata,
		progress,
		setFiles,
		postFiles,
		dispatchMetadata,
		ACTION_REDUCER_METADATA,
	} = useFilesManual({});
	// #endregion

	//#region main UI
	return (
		<>
			{loading ?
				<div className={styles.page_loading}>
					<div className={styles.page_loading_main}>
						<HeadingTitle
							subtitle='Subiendo archivos...'
							accent
						/>

						<LoaderBar
							label
							progress={progress.progress}
							maxValue={100}
						/>
					</div>
				</div >
				:
				<form className={styles.page_form}>
					<div className={styles.page_form_wrapper}>
						<div className={styles.page_form_first}>
							<ListSummary
								title='Subir Archivos'
								opened={view === 0}
							>
								<UploadX
									title='Sube tu primer archivo y visualízalo aquí'
									filesAccepted='.log,.castep,.out'
									maxFiles={1}
									files={files}
									handler={setFiles}
								/>
							</ListSummary>
						</div>

						<div className={styles.page_form_second}>
							<ListSummary
								title='Clasificación de archivos'
								opened={view === 1}
							>
								{files.length > 0 &&
									<p className={styles.page_form_files_resume}>
										{files.length} archivo(s) cargado(s)
									</p>
								}

								<div className={styles.page_form_input}>
									<InputText
										label='Software'
										help='Este valor se calcula de forma automática'
										value={metadata.software}
										handler={(value) => {
											dispatchMetadata({
												type: ACTION_REDUCER_METADATA.UPDATE,
												payload: { software: value }
											})
										}}
										theme='dark'
										disabled
									/>

									<InputText
										label='Familia'
										value={metadata.family}
										symbol='grain'
										handler={(value) => {
											dispatchMetadata({
												type: ACTION_REDUCER_METADATA.UPDATE,
												payload: { family: value }
											})
										}}
										theme='dark'
									/>

									<InputText
										label='Variante'
										value={metadata.variant}
										symbol='co2'
										handler={(value) => {
											dispatchMetadata({
												type: ACTION_REDUCER_METADATA.UPDATE,
												payload: { variant: value }
											})
										}}
										theme='dark'
									/>

									<InputText
										label='Funcional'
										value={metadata.functional}
										symbol='label'
										handler={(value) => {
											dispatchMetadata({
												type: ACTION_REDUCER_METADATA.UPDATE,
												payload: { functional: value }
											})
										}}
										theme='dark'
									/>
								</div>
							</ListSummary>
						</div>
					</div>


					<div className={styles.page_actions}>
						<ButtonPrimary
							label='Agregar Archivos'
							symbol='add'
							handler={postFiles}
							disabled={files.length === 0}
						/>
					</div>
				</form >
			}
		</>
	);
	//#endregion
};