'use client';
/* 
	Hook for handling upload manual files
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


function useFilesManual({ }) {
	// #region references
	// #endregion


	// #region contexts & hooks
	// #endregion


	// #region variables
	// #endregion


	// #region states
	const [files, setFiles] = useState([]);
	const [view, setView] = useState(0);

	const [loading, setLoading] = useState(false);
	const [progress, setProgress] = useState(50);
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
		if (files.length > 0) setView(1);
		else setView(0);
	}, [files.length]);
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		view,
		files,
		loading,
		progress,
		setFiles,
	};
	// #endregion
}


export { useFilesManual };