// ESTADO: Completada
'use client';
/* 
	ROUTES - DASHBOARD / FAMILY / VARIANT
*/
// #region libraries
// #endregion


// #region components
import {
	ButtonPrimary,
	HeadingSubtitle,
	HeadingTitle,
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

import { OverlayProgress, ReportMolGC } from 'components/templates';
// #endregion


// #region assets
// #endregion


// #region utils
import { COLUMNS_TOPSIS } from 'lib/data/tables/TOPSIS';
import { CHART_BAR_LEGEND_ENUM } from 'lib/enums/charts';
// #endregion


// #region hooks
import { useGenerateReport } from 'hooks';
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
		records,
		family,
		variant,
		loading,
		isPlotLoading,
		shouldMountPlot,
		handlerPlotMounted,
		handlerNav
	} = useVariant({});

	const {
		isGenerating,
		handlerGeneratePDF,
		progress,
		totalImages,
	} = useGenerateReport({
		reportComponent: ReportMolGC,
		records: records,
		job: job,
		name: `${family}_${variant}`,
	});

	const renderChart = (item, key) => {
		const common = {
			label: item.data?.title?.split('-') ?? '',
			theme: 'dark'
		};

		switch (item.type) {
			case 'mae_general':
				return (
					<ChartWrap title={common.label[0] || 'Bond Lenghts'} {...common} key={key}>
						<ChartBar
							positionLegend={CHART_BAR_LEGEND_ENUM.BOTTOM}
							data={item.data}
							theme='light'
						/>
					</ChartWrap>
				);

			case 'mae_family':
				return (
					<ChartWrap title={common.label[0] || 'Bond Lenghts'} {...common} key={key}>
						<ChartBar
							positionLegend={CHART_BAR_LEGEND_ENUM.BOTTOM}
							data={item.data}
							theme='light'
						/>
					</ChartWrap>
				);

			case 'mae_variant':
				return (
					<ChartWrap title={common.label[0] || 'Bond Lenghts'} {...common} key={key}>
						<ChartLine
							positionLegend={CHART_BAR_LEGEND_ENUM.BOTTOM}
							data={item.data}
						/>
					</ChartWrap>
				);

			case 'rmsd':
				return (
					<ChartWrap title={common.label[0] || 'RMSD'} {...common} key={key}>
						<ChartLine
							positionLegend={CHART_BAR_LEGEND_ENUM.BOTTOM}
							data={item.data}
						/>
					</ChartWrap>
				);

			default:
				return null;
		}
	};

	const renderFull = (item, key) => {
		switch (item.type) {
			case 'structure':
				return (
					<div key={key} className={styles.page_element_full}>
						{shouldMountPlot ? (
							<PlotStructure
								structure={item}
								onMount={handlerPlotMounted}
							/>
						) : null}

						{isPlotLoading && (
							<div className={styles.page_loader}>
								<Loader
									type={LOADER_ENUM.SPINNER}
									number={7}
									size={64}
									label="cargando estructura 3D..."
								/>
							</div>
						)}
					</div>
				);

			case 'topsis':
				return (
					<div key={key} className={styles.page_element_full}>
						<HeadingTitle
							title='Resultados de TOPSIS'
							label='Puedes ordenar los resultados en base al ranking.'
						/>


						<TableX data={item.data} columns={COLUMNS_TOPSIS}>
							{(props) => <RowsTOPSIS {...props} />}
						</TableX>
					</div>
				);

			default:
				return null;
		}
	};
	// #endregion

	//#region main UI
	if (loading) return (
		<section className={styles.page_loading}>
			<Loader
				type={LOADER_ENUM.SPINNER}
				number={7}
				size={32}
				label='cargando...'
			/>
		</section>
	);

	const pageItems = records?.root?.children ?? [];

	const charts = pageItems.filter((it) =>
		['mae_general', 'mae_family', 'mae_variant', 'rmsd'].includes(it.type)
	);

	const fullWidth = pageItems.filter((it) =>
		['structure', 'topsis'].includes(it.type)
	);

	return (
		<>
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

				<div className={styles.page_section} style={{ display: nav === 0 ? "flex" : "none" }}>
					{charts.map((chart, idx) => renderChart(chart, `chart-${idx}`))}
				</div>

				<div className={styles.page_section} style={{ display: nav === 1 ? "flex" : "none" }}>
					{fullWidth.map((item, idx) => renderFull(item, `full-${idx}`))}
				</div>

				<div className={styles.page_actions}>
					<ButtonPrimary
						label={isGenerating ? 'Generando...' : 'Generar Reporte Individual en PDF'}
						loading={isGenerating}
						handler={handlerGeneratePDF}
						symbol='data_table'
						disabled={isGenerating}
					/>
				</div>
			</div>

			<OverlayProgress
				isVisible={isGenerating}
				progress={progress}
				total={totalImages}
				message={
					progress === 0
						? 'Iniciando generación...'
						: progress === totalImages && totalImages > 0
							? 'Abriendo reporte...'
							: 'Procesando gráficos...'
				}
			/>
		</>
	);
	//#endregion
}