// ESTADO: En desarrollo
'use client';
/* 
	ROUTES - DASHBOARD
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { WrapMain } from 'components/__common__';
import {
	ButtonColor,
	HeadingTitle
} from 'components/atoms';

import { Breadcrumbs, List } from 'components/molecules';

import {
	FooterMolGC,
	FooterSimpleMolGC,
	HeaderMolGC
} from 'components/organisms';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


export default function Dashboard({ }) {
	// #region hooks & others
	const category_id = '12345';
	// #endregion

	//#region main UI
	return (
		<>
			<HeaderMolGC />

			<WrapMain margin padding>
				<Breadcrumbs />

				<div className={styles.page}>
					<HeadingTitle
						symbol='bar_chart'
						title='Resultados obtenidos'
					>
						ID. del resultado: <span className={styles.page_id}> 1234567 </span>
					</HeadingTitle>


					<div className={styles.page_section}>
						<HeadingTitle
							subtitle='Analisis Individual'
						/>
						<div className={styles.page_list}>
							<List
								title='Reporte General'
								label='20 reportes generados'
								symbol='bar_chart'
								href={`/dashboard/${category_id}`}
							/>

							<List
								title='FLUOROQUINOLES'
								label='20 reportes generados'
								symbol='biotech'
								href={`/dashboard/${category_id}`}
							/>

							<List
								title='NITROFURANOS'
								label='20 reportes generados'
								symbol='biotech'
								href={`/dashboard/${category_id}`}
							/>

							<List
								title='QUINOLES'
								label='20 reportes generados'
								symbol='biotech'
								href={`/dashboard/${category_id}`}
							/>
						</div>
					</div>


					<div className={styles.page_buttons}>
						<ButtonColor
							label='Generar reporte global en PDF'
							symbol='data_table'
							color={colorsApp.blue}
							center
						/>

						<ButtonColor
							label='Nuevo Analisis'
							symbol='open_in_new'
							color={colorsApp.green}
							center
						/>
					</div>

					<FooterSimpleMolGC />
				</div>
			</WrapMain>

			<FooterMolGC />
		</>
	);
	//#endregion
};