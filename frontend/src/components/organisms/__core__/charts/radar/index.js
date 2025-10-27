'use client';
/* 
	ORGANISMS - CHART RADAR
*/
// #region libraries
import React from 'react';
import {
	Chart as ChartJS,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend,
} from 'chart.js';
// #endregion


// #region components
import { Radar } from 'react-chartjs-2';
import { BannerFeedback } from 'components/organisms';
// #endregion


// #region assets
// #endregion


// #region utils
import { CHARTS_OPTIONS_NO_AXIS } from 'lib/utils';
import { helperCreateDatasetRadar } from 'lib/helpers';
import { CHART_BAR_LEGEND_ENUM } from 'lib/enums/charts';
// #endregion


// #region hooks
// #endregion


// #region styles
import { useThemeStore } from 'context/__core__';
// #endregion


ChartJS.register(
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend
);


function ChartRadar({
	data = [],
	positionLegend = CHART_BAR_LEGEND_ENUM.RIGHT,
	random = false,
	redraw = false,
	theme = ''
}) {
	// #region hooks & others
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;


	const _options = CHARTS_OPTIONS_NO_AXIS({
		legend: positionLegend,
	});

	const formatData = helperCreateDatasetRadar({
		data: data,
		theme: appliedTheme,
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
				<Radar
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

export { ChartRadar };