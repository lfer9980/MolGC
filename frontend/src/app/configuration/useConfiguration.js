'use client';
/* 
	Hook for configuration page
*/

// #region libraries
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// #endregion


// #region components
// #endregion


// #region assets
import { ANALYSIS_OPTIONS } from 'lib/data/options/analysis';
// #endregion


// #region utils
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
import { useJobStore } from 'store/job';
// #endregion


// #region requests
// #endregion


function useConfiguration({ }) {
	// #region references
	const router = useRouter();
	// #endregion


	// #region contexts & hooks
	const {
		job,
	} = useJobStore();
	// #endregion


	// #region variables
	const references = JSON.parse(job.references);
	// #endregion


	// #region states
	const [analysis, setAnalysis] = useState('');
	const [reference, setReference] = useState('');
	const [viewReference, setViewReference] = useState(false);
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerAnalysis = (value) => setAnalysis(value);
	const handlerReference = (value) => setReference(value);
	// #endregion


	// #region effects
	useEffect(() => {
		setViewReference(analysis === ANALYSIS_OPTIONS[0])
	}, [analysis]);
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		analysis,
		reference,
		viewReference,
		handlerAnalysis,
		handlerReference,
		references,
	};
	// #endregion
}


export { useConfiguration };