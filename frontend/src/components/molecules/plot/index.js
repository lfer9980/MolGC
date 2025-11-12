'use client';
/* 
	MOLECULES - PLOT
	Custom Plot component
*/
// #region libraries
import Plot from 'react-plotly.js';
import React, { useEffect, useMemo, useState } from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
import { useThemeStore } from 'context';
import { THEME_ENUM } from 'context/__core__/theme/__data__';
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


function PlotStructure({
	structure,
	isStatic = false,
	hideLegend = false,
	theme = '',
}) {
	// #region hooks & others
	const [isSmall, setIsSmall] = useState(window.innerWidth < 768);

	useEffect(() => {
		const handleResize = () => setIsSmall(window.innerWidth < 768);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;

	const fullStyle = !isStatic ? styles.full : '';
	// #endregion


	// #region skeletons
	// #endregion



	// #region main UI
	const plotFigure = useMemo(() => {
		if (!structure) return null;

		const layout = {
			...structure.data.layout,
			paper_bgcolor: "rgba(0,0,0,0)",
			plot_bgcolor: "rgba(0,0,0,0)",
			font: { color: "gray" },
			showlegend: !hideLegend,
			scene: {
				...structure.data.layout.scene,
				xaxis: {
					...structure.data.layout.scene.xaxis,
					showgrid: true,
					gridcolor: `${appliedTheme === THEME_ENUM.DARK ? 'rgba(255,255,255,0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
					gridwidth: 0.5,
					zeroline: true,
					gridcolor: `${appliedTheme === THEME_ENUM.DARK ? 'rgba(255,255,255,0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
					showbackground: true,
					backgroundcolor: "rgba(0,0,0,0)"
				},
				yaxis: {
					...structure.data.layout.scene.yaxis,
					showgrid: true,
					gridcolor: `${appliedTheme === THEME_ENUM.DARK ? 'rgba(255,255,255,0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
					gridwidth: 0.5,
					zeroline: true,
					gridcolor: `${appliedTheme === THEME_ENUM.DARK ? 'rgba(255,255,255,0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
					showbackground: true,
					backgroundcolor: "rgba(0,0,0,0)"
				},
				zaxis: {
					...structure.data.layout.scene.zaxis,
					showgrid: true,
					gridcolor: `${appliedTheme === THEME_ENUM.DARK ? 'rgba(255,255,255,0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
					gridwidth: 0.5,
					zeroline: true,
					gridcolor: `${appliedTheme === THEME_ENUM.DARK ? 'rgba(255,255,255,0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
					showbackground: true,
					backgroundcolor: "rgba(0,0,0,0)"
				}
			}, legend: isSmall ?
				{
					orientation: "h",
					y: -0.3,
					x: 0.5,
					xanchor: "center",
					yanchor: "top",
					font: { color: "gray" },
				} : {
					orientation: "v",
					x: 1.05,
					y: 0.5,
					font: { color: `${appliedTheme === THEME_ENUM.DARK ? 'white' : 'black'}` },
				},
			margin: { l: 0, r: 0, t: 40, b: 0, pad: 0 },
			autosize: true,
			dragmode: isStatic ? false : "orbit",
		};


		const config = {
			responsive: true,
			displayModeBar: !isStatic ? true : false,
			scrollZoom: !isStatic,
			doubleClick: !isStatic ? "reset" : false,
			displaylogo: false,
			modeBarButtonsToRemove: [
				"zoom2d",
				"pan2d",
				"select2d",
				"lasso2d",
				"resetScale2d",
				"hoverClosest3d",
				"hoverClosestCartesian",
			],
			staticPlot: false,
			willReadFrequently: true,
		};

		return (
			<Plot
				data={structure.data.data}
				layout={layout}
				config={config}
				style={{
					width: "100%",
					height: "100%",
					position: "absolute",
					top: 0,
					left: 0,
				}}
				useResizeHandler={true}
			/>
		);
	}, [structure, isSmall]);

	return (
		<div className={`${styles.page_structure} ${fullStyle}`}>
			{plotFigure}
		</div>
	);
	// #endregion
}

export { PlotStructure };