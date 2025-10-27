'use client';
/* 
	ORGANISMS - CHART MULTIPLE
*/
// #region libraries
import React from 'react';
import {
	Chart as ChartJS,
	LinearScale,
	CategoryScale,
	BarElement,
	PointElement,
	LineElement,
	Legend,
	Tooltip,
	LineController,
	BarController,
} from 'chart.js';
// #endregion


// #region components
import { Chart } from 'react-chartjs-2';
import { BannerFeedback } from 'components/organisms';
// #endregion


// #region assets
// #endregion


// #region utils
import { CHARTS_OPTIONS } from 'lib/utils';
import { helperCreateDataset } from 'lib/helpers';
import { CHART_BAR_LEGEND_ENUM } from 'lib/enums/charts';
// #endregion


// #region hooks
// #endregion


// #region styles
import { useThemeStore } from 'context/__core__';
// #endregion


ChartJS.register(
	LinearScale,
	CategoryScale,
	BarElement,
	PointElement,
	LineElement,
	Legend,
	Tooltip,
	LineController,
	BarController
);


function ChartMultiple({
	type = 'bar',
	data = [],
	positionLegend = CHART_BAR_LEGEND_ENUM.BOTTOM,
	transparency = false,
	random = false,
	redraw = false,
	theme = ''
}) {
	// #region hooks & others
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;


	const _options = CHARTS_OPTIONS({
		legend: positionLegend,
		theme: appliedTheme,
	});


	const formatData = helperCreateDataset({
		data: data,
		theme: appliedTheme,
		transparency: transparency,
		random: random,
	});

	const options = { ..._options };
	// #endregion


	// #region theme
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<>
			{formatData ?
				<Chart
					type={type}
					data={formatData}
					options={options}
					redraw={redraw}
				/>
				:
				<BannerFeedback
					title='No podemos mostrar esta grafica.'
					label='Aun no se ha generado la informacion para desplegar esta grafica...'
					symbol='info'
					size={64}
				/>
			}
		</>
	);
	// #endregion
}

export { ChartMultiple };