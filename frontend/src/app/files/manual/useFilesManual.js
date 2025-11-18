'use client';
/*
	Hook for handling upload manual files
*/

// #region libraries
import { useEffect, useReducer, useState } from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion

// #region utils
import { FILE_TYPE_ENUM } from 'lib/enums';
import { STYLE_LOG_ENUM } from 'lib/helpers';

const _getFileTypeByExtension = (ext) => {
	switch (ext) {
		case 'castep':
			return FILE_TYPE_ENUM.CASTEP;
		case 'log':
			return FILE_TYPE_ENUM.GAUSSIAN;
		case 'out':
			return FILE_TYPE_ENUM.FHI;

		default:
			return '';
	};
};
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
import { MESSAGE_ENUM } from 'store/__core__/notifications/model';
import { useNotificationStore } from 'store/__core__/notifications';
// #endregion


// #region requests
import { useServiceUpload } from 'services/upload';
// #endregion

function useFilesManual({ }) {
	// #region references
	// #endregion


	// #region contexts & hooks
	const {
		handlerAddMessage,
	} = useNotificationStore({});

	const {
		loading,
		handlerUploadManual,
	} = useServiceUpload({});
	// #endregion


	// #region variables
	const INITIAL_METADATA = {
		family: '',
		variant: '',
		software: '',
		functional: '',
	};

	const ACTION_REDUCER_METADATA = {
		UPDATE: 'update',
		DELETE: 'delete',
	};

	const ReducerMetadata = (state, action) => {
		let newState;
		switch (action.type) {
			case ACTION_REDUCER_METADATA.UPDATE:
				newState = { ...state, ...action.payload }
				return newState;

			case ACTION_REDUCER_METADATA.DELETE:
				return INITIAL_JOB;

			default:
				return state;
		};
	};
	// #endregion


	// #region states
	const [view, setView] = useState(0);
	const [files, setFiles] = useState([]);
	const [progress, setProgress] = useState({ progress: 0, event: null, type: '' });
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	const [metadata, dispatchMetadata] = useReducer(ReducerMetadata, INITIAL_METADATA);
	// #endregion


	// #region handlers
	const handlerProgress = (newProgress) => setProgress(newProgress);

	const postFiles = () => {
		if (files.length <= 0) return;

		handlerUploadManual({
			files: files,
			metadata: metadata,
			handlerProgress: handlerProgress
		});
	};
	// #endregion


	// #region effects
	useEffect(() => {
		if (files.length > 0) setView(1);
		else setView(0);
	}, [files.length]);


	useEffect(() => {
		if (files.length <= 0) return;

		const firstExtension = files[0].name.split(".").pop()?.toLowerCase() || "";
		const allSameExtension = files.every(
			(file) => file.name.split(".").pop()?.toLowerCase() === firstExtension
		);

		if (!allSameExtension) {
			handlerAddMessage({
				content: {
					log: STYLE_LOG_ENUM.WARNING,
					title: 'Sube archivos del mismo tipo',
					label: 'Para poder categorizar tus archivos de forma correcta, sube archivos del mismo tipo.',
					labelButton: 'ENTENDIDO',
					timer: 30000,
				},
				type: MESSAGE_ENUM.NOTIFICATION
			});

			dispatchMetadata({ type: ACTION_REDUCER_METADATA.DELETE });
			return;
		};

		const software = _getFileTypeByExtension(firstExtension);

		dispatchMetadata({
			type: ACTION_REDUCER_METADATA.UPDATE,
			payload: { software: software }
		});
	}, [files]);
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		view,
		loading,
		files,
		metadata,
		progress,
		setFiles,
		postFiles,
		dispatchMetadata,
		ACTION_REDUCER_METADATA,
	};
	// #endregion
}


export { useFilesManual };
