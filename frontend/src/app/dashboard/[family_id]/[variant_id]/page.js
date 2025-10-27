// ESTADO: En desarrollo
'use client';
/* 
	ROUTES - DASHBOARD / FAMILY / VARIANT
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import Plot from 'react-plotly.js';
import { ButtonPrimary, HeadingSubtitle } from 'components/atoms';
import {
	ChartLine,
	ChartRadar,
	ChartWrap,
	NavigatorTabs
} from 'components/organisms';
// #endregion


// #region assets
// #endregion


// #region utils
import { CHART_BAR_LEGEND_ENUM } from 'lib/enums/charts';
// #endregion


// #region hooks
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
		nav,
		structure,
		customLayout,
		handlerNav
	} = useVariant({});

	const tabs = [
		{
			symbol: 'bar_chart',
			label: 'Graficas',
		},
		{
			symbol: 'deployed_code',
			label: 'Vista 3D',
		},
	];
	// #endregion

	//#region main UI
	return (
		<div className={styles.page_main}>
			<div className={styles.page_title}>
				<HeadingSubtitle
					title='Ciprofloxacin'
					label={`Referencia: M06 Gaussian`}
				/>

				<NavigatorTabs
					elements={tabs}
					navPos={nav}
					handler={handlerNav}
					center
				/>
			</div>

			{nav === 0 &&
				<div className={styles.page_section}>
					<ChartWrap
						title='Bond Lenghts'
						label='MAE Functional vs Gaussian M06'
					>
						<ChartRadar
							positionLegend={CHART_BAR_LEGEND_ENUM.BOTTOM}
							random
						/>
					</ChartWrap>

					<ChartWrap
						title='RMSD'
						label='Functional Vs Gaussian M06'
					>
						<ChartLine
							positionLegend={CHART_BAR_LEGEND_ENUM.BOTTOM}
							random
						/>
					</ChartWrap>
				</div>
			}

			{nav === 1 &&
				<div className={styles.page_section}>
					<div className={styles.page_structure}>
						{structure &&
							<Plot
								data={structure?.data}
								layout={customLayout}
								config={{ responsive: true }}
								style={{ width: "100%", height: "100%" }}
								useResizeHandler={true}
							/>
						}
					</div>
				</div>
			}

			<ButtonPrimary
				label='Generar Reporte Individual en PDF'
				symbol='data_table'
			/>
		</div>
	);
	//#endregion
};