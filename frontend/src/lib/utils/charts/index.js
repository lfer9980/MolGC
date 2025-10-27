import { CHART_ENUM } from 'lib/enums/charts';
import { colorsApp } from '../colors';

export const CHARTS_OPTIONS_NO_AXIS = ({ legend }) => {
	return {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: legend,
			},
		}
	};
};

export const CHARTS_OPTIONS = ({ legend, theme }) => {
	return {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: legend,
			},
		},
		scales: {
			x: {
				ticks: {
					color: theme === 'dark' ? colorsApp.gray : colorsApp.gray,
					font: {
						size: 14,
						family: 'opensans',
					},
				},
				grid: {
					color: 'transparent',
					borderDash: [5, 5],
				},
			},
			y: {
				ticks: {
					color: theme === 'dark' ? colorsApp.gray : colorsApp.gray,
					font: {
						size: 14,
						family: 'opensans',
					},
				},
				grid: {
					color: theme === 'dark' ? colorsApp.skeleton_inverse : colorsApp.skeleton,
					borderDash: [5, 5],
				},
			},
		},
	}
};


export const CHART_OPTIONS_PLUGINS = ({ aspect }) => {
	switch (aspect) {
		case CHART_ENUM.GROUPED:
			return {
				interaction: {
					mode: 'index',
					intersect: false,
				},
				scales: {
					x: {
						stacked: true,
					},
					y: {
						stacked: true,
					},
				},
			};

		case CHART_ENUM.HORIZONTAL:
			return {
				indexAxis: 'y',
			};

		case CHART_ENUM.STACKED:
			return {
				scales: {
					x: {
						stacked: true,
					},
					y: {
						stacked: true,
					},
				},
			};

		case CHART_ENUM.VERTICAL:
			return {};

		case CHART_ENUM.BUBBLE:
			return {
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			};

		case CHART_ENUM.SCATTER:
			return {
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			};

		default:
			return {};
	}
};