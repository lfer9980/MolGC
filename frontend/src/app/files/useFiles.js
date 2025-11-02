'use client';

/* 
Hook for element: 
brief description about what this hook does
*/

// #region libraries
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
// #endregion


// #region components
// #endregion


// #region assets
import { JOB_STATUS_ENUM } from 'lib/enums';
// #endregion

// #region utils
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
import { useJobStore } from 'store/job';
import { useServiceResumeUpload } from 'services/upload';
import { useServiceDeleteJob } from 'services/job';
// #endregion


// #region requests
// #endregion


function useFiles({ }) {
	// #region references
	const router = useRouter();
	// #endregion


	// #region contexts & hooks
	const {
		job,
		handlerUpdateJobStore,
	} = useJobStore();

	const {
		loading,
		handlerGetResumeFiles,
	} = useServiceResumeUpload({});

	const {
		handlerDeleteJob,
	} = useServiceDeleteJob({});
	// #endregion


	// #region variables
	const addMoreVisibility = job.upload_type === 'manual';
	// #endregion


	// #region states
	const [resume, setResume] = useState([]);
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerGetResume = useCallback(async () => {
		try {
			const reportResume = await handlerGetResumeFiles();

			if (!reportResume?.data && !reportResume.references) router.push('/');

			const references = { references: JSON.stringify(reportResume?.references) };
			setResume(reportResume?.data);
			handlerUpdateJobStore({ data: references });

		} catch (error) {
			console.error("❌ Error obteniendo resumen:", error);
		};
	}, []);
	// #endregion


	// #region effects
	useEffect(() => {
		if (job.status != JOB_STATUS_ENUM.UPLOAD_COMPLETED) {
			return router.push('/');
		};

		handlerGetResume();
	}, []);

	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		router,
		job,
		loading,
		resume,
		addMoreVisibility,
		handlerDeleteJob,
	};
	// #endregion
}


export { useFiles };