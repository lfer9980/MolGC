'use client';
/*
	ORGANISMS - CHART BAR

	expected data structure:
	data={{
			labels: ['col 1', 'col 2', 'col 3', 'col 4', 'col 5'],
			datasets: [
				{
					label: 'Dataset 1',
					data: [0, 1, 2, 3, 4],
				},
				{
					label: 'Dataset 2',
					data: [0, 1, 2, 3, 4],
				},
				{
					label: 'Dataset 3',
					data: [0, 1, 2, 3, 4],
				},
				{
					label: 'Dataset 4',
					data: [0, 1, 2, 3, 4],
				}
			]
		}}
*/

// #region libraries
import React from 'react';

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
// #endregion


// #region components
import { Bar } from 'react-chartjs-2';
import { BannerFeedback } from 'components/organisms';
// #endregion


// #region assets
import {
	CHART_ENUM,
	CHART_BAR_LEGEND_ENUM
} from 'lib/enums/charts';
// #endregion


// #region utils
import { helperCreateDataset } from 'lib/helpers';
import {
	CHARTS_OPTIONS,
	CHART_OPTIONS_PLUGINS,
} from 'lib/utils';
// #endregion


// #region hooks
// #endregion


// #region styles
import { useThemeStore } from 'context/__core__';
// #endregion


ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);


function ChartBar({
	data = [],
	aspect = CHART_ENUM.VERTICAL,
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

	const _plugins = CHART_OPTIONS_PLUGINS({
		aspect: aspect,
	});


	const formatData = helperCreateDataset({
		data: data,
		theme: appliedTheme,
		transparency: transparency,
		random: random,
	});

	const options = { ..._options, ..._plugins };
	// #endregion


	// #region theme
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<>
			{formatData ?
				<Bar
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

export { ChartBar };
