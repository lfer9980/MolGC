// ESTADO: En desarrollo
'use client';
/* 
	ROUTES - DASHBOARD / FAMILY / VARIANT
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import {
	ButtonPrimary,
	HeadingSubtitle,
	Loader,
	LOADER_ENUM
} from 'components/atoms';

import { PlotStructure } from 'components/molecules';
import {
	ChartBar,
	ChartLine,
	ChartWrap,
	NavigatorTabs,
	RowsTOPSIS,
	TableX
} from 'components/organisms';

import { ReportMolGC } from 'components/templates';
// #endregion


// #region assets
// #endregion


// #region utils
import { COLUMNS_TOPSIS } from 'lib/data/tables/TOPSIS';
import { CHART_BAR_LEGEND_ENUM, CHART_ENUM } from 'lib/enums/charts';
// #endregion


// #region hooks
import { useGenerateReport } from './hooks';
import { useVariant } from './useVariant';
// #endregion


// #region contexts & stores
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


export default function DashboardVariant({ }) {
	// #region hooks & others
	const {
		tabs,
		job,
		nav,
		data,
		variant,
		loading,
		handlerNav
	} = useVariant({});

	const {
        isGenerating,
        handlerGeneratePDF,
	} = useGenerateReport({
		reportComponent: ReportMolGC,
		data: data,
	});
	// #endregion

	//#region main UI
	if (loading) return (
		<section className={styles.page_loading}>
			<Loader
				type={LOADER_ENUM.DOTS}
				number={29}
				size={32}
				label='cargando resultados...'
			/>
		</section>
	);

	return (
		<div className={styles.page_main}>
			<div className={styles.page_title}>
				<HeadingSubtitle
					title={variant}
					label={`Referencia: ${job?.reference}`}
				/>

				<NavigatorTabs
					elements={tabs}
					navPos={nav}
					handler={handlerNav}
					center
				/>
			</div>

			<div className={styles.page_section} style={{ display: nav === 0 ? "block" : "none" }}>
				{data['mae_family'] &&
					<ChartWrap
						title='Bond Lenghts'
						label={data['mae_family'].data.title}
					>
						<ChartBar
							positionLegend={CHART_BAR_LEGEND_ENUM.BOTTOM}
							data={data['mae_family'].data}
						/>
					</ChartWrap>
				}

				{data['mae_general'] &&
					<ChartWrap
						title='Bond Lenghts'
						label={data['mae_general'].data.title}
					>
						<ChartBar
							positionLegend={CHART_BAR_LEGEND_ENUM.BOTTOM}
							aspect={CHART_ENUM.STACKED}
							data={data['mae_general'].data}
							transparency
						/>
					</ChartWrap>
				}

				{data['mae_variant'] &&
					<ChartWrap
						title='Bond Lenghts'
						label={data['mae_variant'].data.title}
					>
						<ChartLine
							positionLegend={CHART_BAR_LEGEND_ENUM.BOTTOM}
							data={data['mae_variant'].data}
						/>
					</ChartWrap>
				}

				{data['rmsd'] &&
					<ChartWrap
						title='RMSD'
						label={data['mae_variant'].data.title}
					>
						<ChartLine
							positionLegend={CHART_BAR_LEGEND_ENUM.BOTTOM}
							data={data['rmsd'].data}
						/>
					</ChartWrap>
				}
			</div>

			<div className={styles.page_section} style={{ display: nav === 1 ? "block" : "none" }}>
				{data['structure'] && <PlotStructure structure={data['structure']} />}

				{data['topsis'] &&
					<TableX
						data={data['topsis'].data}
						columns={COLUMNS_TOPSIS}
					>
						{(props) => <RowsTOPSIS {...props} />}
					</TableX>
				}
			</div>

			<div className={styles.page_buttons}>
				<ButtonPrimary
					label='Generar Reporte Individual en PDF'
					disabled={isGenerating}
					handler={handlerGeneratePDF}
					symbol='data_table'
				/>
			</div>
		</div>
	);
	//#endregion
};