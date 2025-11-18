'use client';
/*
	Hook for handling upload automatic files
*/

// #region libraries
import { useState } from 'react';
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
import { useServiceUpload } from 'services/upload';
// #endregion


function useFilesAutomatic({ }) {
	// #region references
	// #endregion


	// #region contexts & hooks
	const {
		loading,
		handlerUploadAutomatic,
	} = useServiceUpload({});
	// #endregion


	// #region variables
	// #endregion


	// #region states
	const [files, setFiles] = useState([]);
	const [progress, setProgress] = useState({ progress: 0, event: null, type: '' });
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerProgress = (newProgress) => setProgress(newProgress);

	const postFiles = () => {
		if (files.length <= 0) return;

		handlerUploadAutomatic({
			files: files,
			handlerProgress: handlerProgress
		});
	};
	// #endregion


	// #region effects
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		loading,
		files,
		setFiles,
		postFiles,
		progress,
	};
	// #endregion
}


export { useFilesAutomatic };
