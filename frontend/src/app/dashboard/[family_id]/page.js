// ESTADO: En desarrollo
'use client';
/* 
	ROUTES - DASHBOARD / CATEGORY ID
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { ButtonPrimary, HeadingTitle } from 'components/atoms';
import { List } from 'components/molecules';
import { FooterSimpleMolGC } from 'components/organisms';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
import { STYLE_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


export default function DashboardCategory({ }) {
	// #region hooks & others
	// #endregion

	//#region main UI
	return (
		<div className={styles.page}>
			<div className={styles.page_title}>
				<HeadingTitle
					title='Resultados obtenidos'
					symbol='bar_chart'
				>
					ID. del resultado: <span className={styles.page_id}> 1234567 </span>
				</HeadingTitle>

				<HeadingTitle
					subtitle='FLUOROQUINOLES'
				>
					Referencia: <span className={styles.page_reference}> MO6 Gaussian </span>
				</HeadingTitle>
			</div>

			<div className={styles.page_list}>
				<List
					title='Reporte de Familia'
					label='Reporte completo de la familia'
					color={colorsApp.red}
					aspect={STYLE_ENUM.FOURTH}
					labelButton='Visualizar'
				/>

				<List
					title='Ciproflaxin'
					aspect={STYLE_ENUM.FIRST}
				/>

				<List
					title='Enoxacin'
					aspect={STYLE_ENUM.FIRST}
				/>

				<List
					title='Esparfloxacin'
					aspect={STYLE_ENUM.FIRST}
				/>

				<List
					title='Fleroxacin'
					aspect={STYLE_ENUM.FIRST}
				/>
			</div>

			<div className={styles.page_buttons}>
				<ButtonPrimary
					label='Generar reporte de la familia en PDF'
					symbol='data_table'
				/>
			</div>

			<FooterSimpleMolGC />
		</div>
	);
	//#endregion
};