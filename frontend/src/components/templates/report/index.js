'use client';
/* 
	TEMPLATE - REPORT
*/
// #region libraries
import React, { useEffect } from 'react';
// #endregion


// #region components
import { HeadingTitle } from 'components/atoms';
import { ElementImage } from 'components/molecules';
import {
	CardTable,
	ChartLine,
	ChartRadar,
	ChartWrap,
	FooterSimpleMolGC,
	RowsProgress,
	TableX
} from 'components/organisms';
// #endregion


// #region assets
/* TODO: change this to other method */
import PROGRESO_DEV_FRONTEND from 'lib/__core__/JSON/progress.json';
import { REPORT_COLUMNS_EXAMPLE, RESUME_TABLE } from 'demo/common';
// #endregion


// #region utils
import { CHART_BAR_LEGEND_ENUM } from 'lib/enums/charts';
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


function ReportMolGC({ onRendered }) {
	// #region hooks & others
	useEffect(() => {
		const t = setTimeout(() => {
			try { onRendered?.(); } catch (e) { /* ignore */ }
		}, 600);
		return () => clearTimeout(t);
	}, [onRendered]);
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
					width={124}
					height={46}
				/>

				<FooterSimpleMolGC
					noMargin
					theme='light'
				/>
			</header>

			<div className={styles.report_head}>
				<HeadingTitle
					title='Reporte de analisis de MOLGC'
					subtitle='INDIVIDUAL'
					theme='light'
				/>

				<p className={styles.report_reference}>
					Referencia: Gaussian - M06
				</p>
			</div>

			<section className={styles.report_main}>
				<CardTable
					title='Familias'
					elements={RESUME_TABLE}
					theme='light'
				/>

				<ChartWrap
					label='General MAE Summary and TOPSIS Results'
					theme='light'
					mini
				>
					<ChartLine
						random
						theme='light'
					/>
				</ChartWrap>
			</section>

			<section className={styles.report_table}>
				<TableX
					data={PROGRESO_DEV_FRONTEND}
					columns={REPORT_COLUMNS_EXAMPLE}
					theme='light'
				>
					{(props) => <RowsProgress {...props} />}
				</TableX>
			</section>

			<section className={styles.report_chart}>
				<ChartWrap
					label='MAE General: FLUOROQUINOLES'
					theme='light'
					mini
				>
					<ChartLine
						random
						theme='light'
					/>
				</ChartWrap>
			</section>

			<hr />
			<div className={styles.report_head}>
				<HeadingTitle
					title='Reporte de analisis de MOLGC'
					subtitle='INDIVIDUAL POR VARIANTE'
					label='CIPROFLAXIN'
					theme='light'
				/>

				<p className={styles.report_reference}>
					Referencia: Gaussian - M06
				</p>
			</div>

			<section className={styles.report_main}>
				<ChartWrap
					label='Bond Lengths MAE Functional'
					theme='light'
					mini
				>
					<ChartRadar
						random
						positionLegend={CHART_BAR_LEGEND_ENUM.BOTTOM}
						theme='light'
					/>
				</ChartWrap>

				<ChartWrap
					label='RMSD'
					theme='light'
					mini
				>
					<ChartLine
						random
						theme='light'
					/>
				</ChartWrap>
			</section>

			<section className={styles.report_table}>
				<ChartWrap
					label='3D Structure'
					theme='light'
					mini
				>
					<ChartLine
						random
						theme='light'
					/>
				</ChartWrap>
			</section>
		</main>
	);
	// #endregion
}

export { ReportMolGC };