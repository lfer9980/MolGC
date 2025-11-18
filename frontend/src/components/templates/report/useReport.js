'use client';
/*
	Hook for control useReport mounting:
*/

// #region libraries
import { useCallback, useEffect, useState } from 'react';
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


function useReport({ onRendered, records }) {
	// #region references
	// #endregion


	// #region contexts & hooks
	// #endregion


	// #region variables
	// #endregion


	// #region states
	const [resume, setResume] = useState({});
	// #endregion


	// #region memos & callbacks
	const getCountsCallback = useCallback((records) => {
		const families = records?.children;

		if (families) {
			const nonGeneralFamilies = families.filter(f => f.family !== "Reporte General");

			const result = nonGeneralFamilies.reduce((acc, family) => {
				const variants = family.children.filter(v => v.variant !== "General");
				acc[family.family] = `${variants.length} variantes`;
				return acc;
			}, {});

			setResume(result);
		}
	}, []);
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	// #endregion


	// #region effects
	useEffect(() => {
		const t = setTimeout(() => {
			try { onRendered?.(); } catch (e) { }
		}, 600);
		return () => clearTimeout(t);
	}, [onRendered]);

	useEffect(() => {
		getCountsCallback(records);
	}, [records, getCountsCallback]);
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		resume,
	};
	// #endregion
}


export { useReport };
