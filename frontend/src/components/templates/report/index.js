'use client';
/* 
	TEMPLATE - REPORT
*/
// #region libraries
import React, { Fragment } from 'react';
// #endregion


// #region components
import { HeadingSubtitle, HeadingTitle } from 'components/atoms';
import { ElementImage, PlotStructure } from 'components/molecules';
import {
	CardTable,
	ChartBar,
	ChartLine,
	ChartWrap,
	FooterSimpleMolGC,
	RowsTOPSIS,
	TableX
} from 'components/organisms';
// #endregion


// #region assets

// #endregion


// #region utils
import { COLUMNS_TOPSIS_REPORT } from 'lib/data/tables/TOPSIS';
import { CHART_BAR_LEGEND_ENUM, CHART_ENUM } from 'lib/enums/charts';
// #endregion


// #region hooks
import { useReport } from './useReport';
// #endregion


// #region contexts & stores
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


function ReportMolGC({
	onRendered,
	job,
	records,
	showResume = false,
}) {
	// #region hooks & others
	const {
		resume
	} = useReport({
		onRendered: onRendered,
		records: records,
	});

	function renderChart(el, key) {
		const common = {
			title: el.type === 'rmsd' ? 'RMSD' : 'Bond Lenghts',
			label: el.data?.title,
			theme: 'light',
			noHover: true
		};

		switch (el.type) {
			case 'mae_general':
				return (
					<ChartWrap {...common} key={key}>
						<ChartBar
							positionLegend={CHART_BAR_LEGEND_ENUM.BOTTOM}
							aspect={CHART_ENUM.STACKED}
							data={el.data}
							transparency
						/>
					</ChartWrap>
				);
			case 'mae_family':
				return (
					<ChartWrap {...common} key={key}>
						<ChartBar
							positionLegend={CHART_BAR_LEGEND_ENUM.BOTTOM}
							data={el.data}
						/>
					</ChartWrap>
				);
			case 'mae_variant':
				return (
					<ChartWrap {...common} key={key}>
						<ChartLine
							positionLegend={CHART_BAR_LEGEND_ENUM.BOTTOM}
							data={el.data}
						/>
					</ChartWrap>
				);
			case 'rmsd':
				return (
					<ChartWrap {...common} key={key}>
						<ChartLine
							positionLegend={CHART_BAR_LEGEND_ENUM.BOTTOM}
							data={el.data}
						/>
					</ChartWrap>
				);
			default:
				return null;
		};
	};

	function renderFull(el, key) {
		switch (el.type) {
			case 'topsis':
				return (
					<div className={styles.report_element_full} key={key}>
						<TableX
							data={el.data}
							columns={COLUMNS_TOPSIS_REPORT}
							theme='light'
						>
							{(props) => <RowsTOPSIS {...props} />}
						</TableX>
					</div>
				);
			case 'structure':
				return (
					<div className={styles.report_element_full} key={key}>
						<PlotStructure
							structure={el}
							isStatic
							hideLegend
							theme='light'
							imageSrc={el.staticImage || null}
						/>
					</div>
				);
			default:
				return null;
		}
	};

	// #endregion

	// #region main UI
	return (
		<main className={styles.report}>
			<header className={styles.report_header}>
				<div className={styles.report_header_left}>
					<ElementImage
						image='/images/logotipo.png'
						width={200}
						height={100}
					/>
					<HeadingSubtitle
						title='Reporte de análisis de MOLGC'
						label={`${job?.analysis_type ? 'INDIVIDUAL POR VARIANTE' : ''}`}
						theme='light'
					/>
				</div>

				<FooterSimpleMolGC
					noMargin
					theme='light'
				/>
			</header>

			{records?.children?.map((item, i) => (
				<Fragment key={`family-${i}`}>
					<div className={styles.report_head}>
						<div />
						<div>
							<HeadingSubtitle
								title={`${decodeURIComponent(item?.family ?? '')}`}
								center
								theme='light'
							>
								<p className={styles.report_reference}>
									Referencia: {job?.reference}
								</p>
							</HeadingSubtitle>
						</div>
					</div>

					{item?.children?.map((element, j) => {
						const children = element?.children ?? [];

						const charts = children.filter((c) =>
							['mae_general', 'mae_family', 'mae_variant', 'rmsd'].includes(c.type)
						);

						const fullWidth = children.filter((c) =>
							['topsis', 'structure'].includes(c.type)
						);

						return (
							<section key={`variant-${i}-${j}`} className={styles.report_section}>
								<div className={styles.report_head}>
									<HeadingTitle
										title={element?.variant ?? ''}
										theme='light'
										accent
									/>
								</div>

								<div className={styles.report_main}>
									{charts.length > 0 && (
										<div className={styles.report_grid}>
											{showResume && resume && i === 0 &&
												<CardTable
													title='Familias'
													elements={resume}
													theme='light'
												/>
											}

											{charts.map((el, k) => (
												<div
													className={styles.report_element}
													key={`chart-${i}-${j}-${k}`}
												>
													{renderChart(el, `chart-${i}-${j}-${k}`)}
												</div>
											))}
										</div>
									)}

									{fullWidth.length > 0 && (
										<div className={styles.report_list}>
											{fullWidth.map((el, k) =>
												renderFull(el, `full-${i}-${j}-${k}`)
											)}
										</div>
									)}
								</div>

								<div className={styles.page_break} aria-hidden="true" />
							</section>
						);
					})}
				</Fragment>
			))}
		</main>
	);
	// #endregion
}

export { ReportMolGC };