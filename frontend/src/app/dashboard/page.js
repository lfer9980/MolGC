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
	ButtonPill,
	HeadingTitle,
	Loader,
	LOADER_ENUM
} from 'components/atoms';

import { Breadcrumbs, List } from 'components/molecules';

import {
	FooterMolGC,
	FooterSimpleMolGC,
	HeaderMolGC
} from 'components/organisms';

import { ReportMolGC } from 'components/templates';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
import { STYLE_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
import { useGenerateReport } from './hooks';
import { useDashboard } from './useDashboard';
// #endregion


// #region contexts & stores
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


export default function Dashboard({ }) {
	// #region hooks & others
	const {
		router,
		loading,
		resume,
		nav,
		colors,
		handlerNav,
		handlerRedirect,
	} = useDashboard({});

	const {
        isGenerating,
        handlerGeneratePDF,
	} = useGenerateReport({
		reportComponent: ReportMolGC,
		resume: resume,
	});

	// #endregion

	//#region main UI
	return (
		<>
			<HeaderMolGC />

			<WrapMain margin padding full={loading}>
				{loading ?
					<Loader
						size={28}
						type={LOADER_ENUM.DOTS}
						number={3}
					/>
					:
					<>
						<Breadcrumbs />

						<div className={styles.page}>
							<HeadingTitle
								symbol='bar_chart'
								title='Resultados obtenidos'
							>
								ID. del resultado: <span className={styles.page_id}> {resume[0]?.job_id} </span>
							</HeadingTitle>


							<div className={styles.page_section}>
								<div className={styles.page_heading_main}>
									{nav !== 0 &&
										<ButtonPill
											symbol='arrow_left_alt'
											color={colorsApp.transparent}
											handler={() => handlerNav(0)}
										/>
									}

									<div className={styles.page_heading_head}>
										<HeadingTitle
											subtitle={resume[0]?.analysis_type}
										/>
									</div>
								</div>

								<div className={styles.page_list}>
									{resume?.length > 0 &&
										<>
											{nav === 0 && resume?.map((item, i) => (
												<List
													key={i}
													title={item?.title}
													label={`${item?.size} reportes generados`}
													symbol={`${item?.title === 'Reporte General' ? 'bar_chart' : 'data_table'}`}
													color={`${item?.title === 'Reporte General' ? colorsApp.blue : colors[i]}`}
													labelButton={`${item?.title === 'Reporte General' ? 'Ver Reporte' : 'Detalles'}`}
													aspect={`${item?.title === 'Reporte General' ? STYLE_ENUM.FOURTH : STYLE_ENUM.SECOND}`}
													/* TODO: this logic does not look good, try to refactor */
													handler={() => {
														handlerNav(i);
														if (i === 0) handlerRedirect({
															family: item?.title,
															variant: item?.children[0]?.title
														})
													}}
												/>
											))}

											{nav !== 0 && resume[nav]?.children?.map((item, i) => (
												<List
													key={i}
													title={item?.title}
													color={colorsApp.dark_blue}
													labelButton='Ver Reporte'
													aspect={`${item?.title === 'General' ? STYLE_ENUM.FOURTH : STYLE_ENUM.SECOND}`}
													handler={() => handlerRedirect({
														family: resume[nav]?.title,
														variant: item?.title
													})}
												>
													<p className={styles.page_list_label}>{`${item?.size} reporte(s) generado(s)`}</p>
												</List>
											))
											}
										</>
									}
								</div>
							</div>

							<div className={styles.page_buttons}>
								<ButtonColor
									label='Generar reporte global en PDF'
									symbol='data_table'
									color={colorsApp.blue}
									disabled={isGenerating}
									handler={handlerGeneratePDF}
									center
								/>

								<ButtonColor
									label='Nuevo Análisis'
									symbol='open_in_new'
									color={colorsApp.green}
									handler={() => router.push('/')}
									center
								/>
							</div>

							<FooterSimpleMolGC />
						</div>
					</>
				}
			</WrapMain>
			<FooterMolGC />
		</>
	);
	//#endregion
};