'use client';

/* 
	Hook for useFiles
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
// #endregion


// #region requests
import { useServiceJob } from 'services/job';
import { useServiceUpload } from 'services/upload';
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
		handlerGetResumeFiles,
	} = useServiceUpload({});

	const {
		handlerDeleteJob,
	} = useServiceJob({});
	// #endregion


	// #region variables
	const addMoreVisibility = job.upload_type === 'manual';
	// #endregion


	// #region states
	const [resume, setResume] = useState([]);
	const [loading, setLoading] = useState(true);
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

			const references = { available_references: JSON.stringify(reportResume?.references) };
			
			setResume(reportResume?.data);
			handlerUpdateJobStore({ data: references });

			setLoading(false);
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