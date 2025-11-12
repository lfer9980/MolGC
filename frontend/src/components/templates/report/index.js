'use client';
/* 
	TEMPLATE - REPORT
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { HeadingSubtitle, HeadingTitle } from 'components/atoms';
import { ElementImage, PlotStructure } from 'components/molecules';
import {
	CardTable,
	ChartBar,
	ChartLine,
	ChartRadar,
	ChartWrap,
	FooterSimpleMolGC,
	RowsProgress,
	TableX
} from 'components/organisms';
// #endregion


// #region assets

// #endregion


// #region utils
import { CHART_BAR_LEGEND_ENUM, CHART_ENUM } from 'lib/enums/charts';
// #endregion


// #region hooks
import { useReport } from './useReport';
// #endregion


// #region contexts & stores
import { useJobStore } from 'store/job';
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


function ReportMolGC({ onRendered, resume, data }) {
	// #region hooks & others
	const {
		job,
	} = useJobStore({});

	const {

	} = useReport({
		onRendered: onRendered,
	});
	// #endregion


	// #region theme
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<main className={`${styles.report}`}>
			<header className={styles.report_header}>
				<ElementImage
					image='/images/logotipo.png'
					width={200}
					height={100}
				/>

				<FooterSimpleMolGC
					noMargin
					theme='light'
				/>
			</header>

			<div className={styles.report_head}>
				<HeadingTitle
					title={data['metadata']?.variant}
					subheading='Reporte de análisis de MOLGC'
					label={`${job?.analysis_type ? 'INDIVIDUAL POR VARIANTE' : ''}`}
					theme='light'
					accent
				/>

				<div>
					<HeadingSubtitle
						title={`familia: ${decodeURIComponent(data['metadata']?.family)}`}
						theme='light'
					>
						<p className={styles.report_reference}>
							Referencia: Gaussian - M06
						</p>
					</HeadingSubtitle>
				</div>
			</div>

			<section className={styles.report_main}>
				{data['mae_general'] &&
					<ChartWrap
						title='Bond Lenghts'
						label={data['mae_general'].data.title}
						theme='light'
						noHover
					>
						<ChartBar
							positionLegend={CHART_BAR_LEGEND_ENUM.BOTTOM}
							aspect={CHART_ENUM.VERTICAL}
							data={data['mae_general'].data}
							transparency
						/>
					</ChartWrap>
				}

				{data['mae_family'] &&
					<ChartWrap
						title='Bond Lenghts'
						label={data['mae_family'].data.title}
						theme='light'
						noHover
					>
						<ChartBar
							positionLegend={CHART_BAR_LEGEND_ENUM.BOTTOM}
							data={data['mae_family'].data}
						/>
					</ChartWrap>
				}

				{data['mae_variant'] &&
					<ChartWrap
						title='Bond Lenghts'
						label={data['mae_variant'].data.title}
						theme='light'
						noHover
					>
						<ChartLine
							positionLegend={CHART_BAR_LEGEND_ENUM.BOTTOM}
							data={data['mae_variant'].data}
							theme='light'
						/>
					</ChartWrap>
				}

				{data['rmsd'] &&
					<ChartWrap
						title='RMSD'
						label={data['mae_variant'].data.title}
						theme='light'
						noHover
					>
						<ChartLine
							positionLegend={CHART_BAR_LEGEND_ENUM.BOTTOM}
							data={data['rmsd'].data}
							theme='light'
						/>
					</ChartWrap>
				}
			</section>

			<section className={styles.report_main}>
				{data['structure'] &&
					<PlotStructure
						structure={data['structure']}
						theme='light'
						isStatic
						hideLegend
					/>
				}
			</section>
		</main >
	);
	// #endregion
}

export { ReportMolGC };