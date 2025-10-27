// ESTADO: En desarrollo
'use client';
/* 
	ROUTES - FAQs - Tutorial
	*/
// #region libraries
import React from 'react';
// #endregion


// #region components

import {
	MilkdownEditor,
	MilkdownFooter,
	MilkdownHeader
} from 'components/organisms';
// #endregion


// #region assets
import { DATA_TUTORIAL_EXAMPLE } from 'demo/common';
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


export default function FAQsTutorial({ }) {
	// #region hooks & others

	const endpointsListExample = {
		uploadImage: '/upload/image',
		deleteImage: '/delete/image',
		createContent: '/create/blog',
		deleteContent: '/delete/blog',
	};
	// #endregion

	//#region main UI
	return (
		<>
			<MilkdownEditor
				title='documento de muestra'
				data={DATA_TUTORIAL_EXAMPLE}
				header={
					<MilkdownHeader
						title='Titulo del proyecto'
						label='Documento X'
					/>
				}
				footer={
					<MilkdownFooter
						title='Documento X'
						label='Titulo del proyecto'
					/>
				}
				endpoints={endpointsListExample}
				download
			/>
		</>
	);
	//#endregion
};