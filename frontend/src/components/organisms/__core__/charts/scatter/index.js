'use client';
/* 
	ORGANISMS - CHART SCATTER
*/
// #region libraries
import React from 'react';
import {
	Chart as ChartJS,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend,
} from 'chart.js';
// #endregion


// #region components
import { Scatter } from 'react-chartjs-2';
import { BannerFeedback } from 'components/organisms';
// #endregion


// #region assets
// #endregion


// #region utils
import { helperCreateDatasetScatter } from 'lib/helpers';
import {
	CHART_OPTIONS_PLUGINS,
	CHARTS_OPTIONS
} from 'lib/utils';

import {
	CHART_BAR_LEGEND_ENUM,
	CHART_ENUM
} from 'lib/enums/charts';
// #endregion


// #region hooks
// #endregion


// #region styles
import { useThemeStore } from 'context/__core__';
// #endregion


ChartJS.register(
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend,
);


function ChartScatter({
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

	const _plugins = CHART_OPTIONS_PLUGINS({
		aspect: CHART_ENUM.SCATTER,
	});


	const formatData = helperCreateDatasetScatter({
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
			{data ?
				<Scatter
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

export { ChartScatter };