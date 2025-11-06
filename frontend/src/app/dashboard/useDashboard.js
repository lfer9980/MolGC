'use client';

/* 
	Hook for control Dashboard page: 
*/

// #region libraries
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { useJobStore } from 'store/job';
// #endregion


// #region requests
import { useServiceReport } from 'services/report';
// #endregion


function useDashboard({ }) {
	// #region references
	const router = useRouter();
	// #endregion


	// #region contexts & hooks
	const {
		handlerUpdateJobStore,
	} = useJobStore();

	const {
		loading,
		handlerGetResumeReport,
	} = useServiceReport({});


	// #endregion


	// #region variables
	// #endregion


	// #region states
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

	const handlerRedirect = ({ family, variant }) => {
		return router.push(`/dashboard/${family ? family : ''}/${variant ? variant : ''}`);
	};
	// #endregion


	// #region effects
	useEffect(() => {
		const fetchReportResume = async () => {
			const data = await handlerGetResumeReport();
			if (data) {
				setResume(data);
				
				const resume = { resume: JSON.stringify(data) };
				handlerUpdateJobStore({ data: resume });

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
		handlerRedirect,
	};
	// #endregion
}


export { useDashboard };