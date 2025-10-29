// ESTADO: En desarrollo
'use client';
/* 
ROUTES - FILES - Automatic
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { ButtonPrimary } from 'components/atoms';
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
		files,
		setFiles,
	} = useFilesAutomatic({});
	// #endregion

	//#region main UI
	return (
		<form className={styles.page_form}>
			<div className={styles.page_form_main}>
				<UploadX
					title='Sube tu primer archivo y visualizalo aqui.'
					filesAccepted='.zip,.rar,.7z,.tar,.tar.gz,.tgz'
					maxFiles={1}
					files={files}
					handler={setFiles}
				/>
			</div>

			<ListSummary
				title='Acerca de la estructura de los archivos'
				opened
			>
				<div className={styles.page_form_structure}>
					<Tree
						title='Estructura general'
						label='Te presentamos la estructura que debe contener tu archivo comprimido, con esta estructura, MolGC sera capaz de leer tus archivos de forma automatica.'
						elements={TREE_FILES_STRUCTURE}
						prefix='|-- '
					/>

					<Tree
						title='Ejemplo practico'
						elements={TREE_FILES_STRUCTURE_EXAMPLE}
						prefix='|-- '
					/>
				</div>
			</ListSummary>

			<ButtonPrimary
				label='Agregar Archivos'
				symbol='add'
				disabled={files.length <= 0}
			/>
		</form>
	);
	//#endregion
};