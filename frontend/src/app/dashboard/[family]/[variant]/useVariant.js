'use client';
/* 
	Hook for get and render all information related to report for specific family/variant: 
*/

// #region libraries
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion

// #region utils
import { getReportUrls } from 'lib/helpers';
import { useJobStore } from 'store/job';
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
// #endregion


// #region requests
// #endregion


function useVariant({ }) {
	// #region references
	const params = useParams();
	// #endregion 


	// #region contexts & hooks
	const {
		job,
	} = useJobStore();
	// #endregion


	// #region variables
	const { family, variant } = params;
	console.log(family)
	// #endregion


	// #region states
	const [urls, setUrls] = useState([]);
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	// #endregion


	// #region effects
	useEffect(() => {
		if (family && variant && job.resume) {
			const resume = JSON.parse(job.resume);
			const reportUrls = getReportUrls(resume, family, variant);

			setUrls(reportUrls);
		}
	}, [family, variant]);

	// #endregion


	// #region others
	console.log(urls);
	// #endregion


	// #region main
	return {
	};
	// #endregion
}


export { useVariant };