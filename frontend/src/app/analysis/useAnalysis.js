'use client';
/* 
	Hook for analysis: 
*/

// #region libraries
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion

// #region utils
import { JOB_STATUS_ENUM } from 'lib/enums';
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
import { useJobStore } from 'store/job';
import { useServiceAnalysis } from 'services/analysis';
// #endregion


// #region requests
// #endregion


function useAnalysis({ }) {
	// #region references
	const router = useRouter();
	// #endregion


	// #region contexts & hooks
	const {
		job,
	} = useJobStore();

	const {
		messages,
		handlerCreateAnalysis,
		handlerGetAnalysis,
	} = useServiceAnalysis({});
	// #endregion


	// #region variables
	// #endregion


	// #region states
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
		const startAnalysis = async () => {
			if (job.status === JOB_STATUS_ENUM.ANALYSIS) {
				return handlerGetAnalysis();
			};

			if (job.status === JOB_STATUS_ENUM.READY) {
				await handlerCreateAnalysis();
				return handlerGetAnalysis();
			};

			if (job.status === JOB_STATUS_ENUM.COMPLETED) {
				return router.push('/dashboard');
			};

			if (job.status === JOB_STATUS_ENUM.UPLOAD_PENDING) {
				return router.push('/');
			}
		};

		startAnalysis();
	}, [job.status]);
	// #endregion


	// #region others
	console.log(messages)
	// #endregion


	// #region main
	return {
		messages,
	};
	// #endregion
}


export { useAnalysis };