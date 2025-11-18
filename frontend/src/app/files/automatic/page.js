// ESTADO: Completada
'use client';
/*
	ROUTES - FILES - Automatic
*/

// #region libraries
import React from 'react';
// #endregion


// #region components
import {
	ButtonPrimary,
	HeadingTitle,
	LoaderBar
} from 'components/atoms';
import { ListSummary, Tree } from 'components/molecules';
import { UploadX } from 'components/organisms';
// #endregion


// #region assets
import {
	TREE_FILES_STRUCTURE,
	TREE_FILES_STRUCTURE_EXAMPLE
} from 'demo/common';
// #endregion


// #region utils
// #endregion


// #region hooks
import { useFilesAutomatic } from './useFilesAutomatic';
// #endregion


// #region contexts & stores
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


export default function FilesAuto({ }) {
	// #region hooks & others
	const {
		loading,
		files,
		progress,
		setFiles,
		postFiles,
	} = useFilesAutomatic({});
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
							<UploadX
								title='Sube tu primer archivo y visualízalo aquí'
								filesAccepted='.zip,.rar,.7z,.tar,.tar.gz,.tgz'
								maxFiles={1}
								files={files}
								handler={setFiles}
							/>
						</div>

						<div className={styles.page_form_second}>
							<ListSummary
								title='Acerca de la estructura de los archivos'
								opened={files.length === 0}
							>
								<div className={styles.page_form_structure}>
									<Tree
										title='Estructura general'
										label='Te presentamos la estructura que debe contener tu archivo comprimido, con esta estructura, MolGC sera capaz de leer tus archivos de forma automática.'
										elements={TREE_FILES_STRUCTURE}
										prefix='|-- '
									/>

									<Tree
										title='Ejemplo práctico'
										elements={TREE_FILES_STRUCTURE_EXAMPLE}
										prefix='|-- '
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
							disabled={files.length <= 0}
						/>
					</div>
				</form>
			}
		</>
	);
	//#endregion
};
