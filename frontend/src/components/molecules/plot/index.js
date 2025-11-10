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
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


function PlotStructure({ structure }) {
	// #region hooks & others
	const [isSmall, setIsSmall] = useState(window.innerWidth < 768);

	useEffect(() => {
		const handleResize = () => setIsSmall(window.innerWidth < 768);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const plotFigure = useMemo(() => {
		if (!structure) return null;

		const layout = {
			...structure.data.layout,
			paper_bgcolor: "rgba(0,0,0,0)",
			plot_bgcolor: "rgba(0,0,0,0)",
			font: { color: "gray" },
			scene: {
				...structure.data.layout.scene,
				xaxis: {
					...structure.data.layout.scene.xaxis,
					showgrid: true,
					gridcolor: "rgba(255,255,255,0.1)",
					gridwidth: 0.1,
					zeroline: true,
					zerolinecolor: "rgba(255,255,255,0.2)",
					showbackground: true,
					backgroundcolor: "rgb(10,10,30)"
				},
				yaxis: {
					...structure.data.layout.scene.yaxis,
					showgrid: true,
					gridcolor: "rgba(255,255,255,0.1)",
					gridwidth: 0.1,
					zeroline: true,
					zerolinecolor: "rgba(255,255,255,0.2)",
					showbackground: true,
					backgroundcolor: "rgb(10,10,30)"
				},
				zaxis: {
					...structure.data.layout.scene.zaxis,
					showgrid: true,
					gridcolor: "rgba(255,255,255,0.1)",
					gridwidth: 0.1,
					zeroline: true,
					zerolinecolor: "rgba(255,255,255,0.2)",
					showbackground: true,
					backgroundcolor: "rgb(10,10,30)"
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
					font: { color: "white" },
				},
			margin: { l: 0, r: 0, t: 80, b: 0, pad: 0 },
			autosize: true,
		};

		return (
			<Plot
				data={structure.data.data}
				layout={layout}
				config={{ responsive: true }}
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
	// #endregion


	// #region theme
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<div className={styles.page_structure}>
			{plotFigure}
		</div>
	);
	// #endregion
}

export { PlotStructure };