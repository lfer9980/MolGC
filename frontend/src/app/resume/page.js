// ESTADO: En desarrollo
'use client';
/* 
	ROUTES - RESUME 
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { WrapScroll } from 'components/__common__';
import {
	ButtonColor,
	ButtonPrimary,
	HeadingSubtitle,
	HeadingTitle
} from 'components/atoms';

import { More } from 'components/molecules';
import { CardTable } from 'components/organisms';
// #endregion


// #region assets
import { colorsApp } from 'lib/utils';
import { RESUME_TABLE } from 'demo/common';
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


export default function Resume({ }) {
	// #region hooks & others
	// #endregion

	//#region main UI
	return (
		<div className={styles.page}>
			<HeadingTitle
				title='Archivos cargados'
				label='Este es el resumen de los archivos que cargaste'
				symbol='upload'
			/>

			<HeadingSubtitle
				subtitle='Resumen de familias agregadas'
			/>

			<div className={styles.page_main}>
				<WrapScroll margin>
					<CardTable
						title='FLUOROQUINOLES'
						symbol='biotech'
						color={colorsApp.background_second}
						elements={RESUME_TABLE}
					/>

					<CardTable
						title='NITROFURANOS'
						symbol='biotech'
						color={colorsApp.background_second}
						elements={RESUME_TABLE}
					/>

					<CardTable
						title='QUINOLES'
						symbol='biotech'
						color={colorsApp.background_second}
						elements={RESUME_TABLE}
					/>
				</WrapScroll>
			</div>

			<More
				label='Agregar nuevo'
				handler={() => alert('metodo no implementado')}
			/>

			<div className={styles.page_buttons}>
				<ButtonPrimary
					symbol='not_started'
					label='Continuar'
				/>

				<ButtonColor
					label='Cancelar operacion'
					color={colorsApp.dark_red}
					symbol='cancel'
					outline
					center
				/>
			</div>
		</div>
	);
	//#endregion
};