'use client';
/* 
	Hook for controls Dashboards resuls on variant view: 
*/

// #region libraries
import { useEffect, useState } from 'react';
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


// #region requests
// #endregion


function useVariant({ }) {
	// #region references
	// #endregion


	// #region contexts & hooks
	// #endregion


	// #region variables
	// #endregion


	// #region states
	const [nav, setNav] = useState(0);
	const [structure, setStructure] = useState(null);
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerNav = (value) => setNav(value);
	// #endregion


	// #region effects
	useEffect(() => {
		fetch('/data/FLUOROQUINOLONES/ciprofloxacin_files/ciprofloxacin_structure.json')
			.then((res) => res.json())
			.then((data) => setStructure(data));
	}, []);
	// #endregion


	// #region others
	/* TODO: this code needs to be treathed on backend not here */
	const customLayout = {
		...structure?.layout,
		template: "plotly_white",
		paper_bgcolor: "rgba(0,0,0,0)",
		plot_bgcolor: "rgba(0,0,0,0)",
		margin: { l: 0, r: 0, t: 0, b: 0 },
		title: {
			...structure?.layout.title,
			font: { size: 18 },
			x: 0.5
		}
	};
	// #endregion


	// #region main
	return {
		nav,
		structure,
		customLayout,
		handlerNav
	};
	// #endregion
}


export { useVariant };