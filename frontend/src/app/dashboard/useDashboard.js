'use client';

/* 
	Hook for control Dashboard page: 
*/

// #region libraries
import { useEffect, useState } from 'react';
import { useServiceReport } from 'services/report';
import { useJobStore } from 'store/job';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion

// #region utils
import { helperRandomColor } from 'lib/helpers';
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
// #endregion


// #region requests
// #endregion


function useDashboard({ }) {
	// #region references
	// #endregion


	// #region contexts & hooks
	const {
		job,
	} = useJobStore();

	const {
		handlerGetResumeReport,
	} = useServiceReport({});


	// #endregion


	// #region variables
	// #endregion


	// #region states
	const [loading, setLoading] = useState(false);
	const [colors, setColors] = useState([]);
	const [resume, setResume] = useState([]);
	const [nav, setNav] = useState(0);
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerNav = (view) => setNav(view);
	// #endregion


	// #region effects
	useEffect(() => {
		const fetchReportResume = async () => {
			const data = await handlerGetResumeReport();
			if (data) {
				setResume(data);

				const colorsList = helperRandomColor({
					count: data.length,
					allowed: [
						'gray',
						'purple',
						'green',
						'orange',
						'red',
					],
				});

				setColors(colorsList);
			};
		};

		fetchReportResume();
	}, []);
	// #endregion


	// #region others

	// #endregion


	// #region main
	return {
		loading,
		resume,
		nav,
		colors,
		handlerNav,
	};
	// #endregion
}


export { useDashboard };