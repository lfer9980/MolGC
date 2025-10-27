'use client';
/* 
	ORGANISMS - CHART BUBBLE
*/
// #region libraries
import React from 'react';
import {
	Chart as ChartJS,
	LinearScale,
	PointElement,
	Tooltip,
	Legend,
} from 'chart.js';
// #endregion


// #region components
import { Bubble } from 'react-chartjs-2';
import { BannerFeedback } from 'components/organisms';
// #endregion


// #region assets
import {
	CHART_ENUM,
	CHART_BAR_LEGEND_ENUM,
} from 'lib/enums/charts';
// #endregion


// #region utils
import { helperCreateDatasetBubble } from 'lib/helpers';

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
	LinearScale,
	PointElement,
	Tooltip,
	Legend
);


function ChartBubble({
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
		aspect: CHART_ENUM.BUBBLE,
	});


	const formatData = helperCreateDatasetBubble({
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
				<Bubble
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

export { ChartBubble };