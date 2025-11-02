'use client';
/* 
	Hook for Get the resume of uploaded files.
*/

// #region libraries
import { useState } from 'react';
// #endregion


// #region components
// #endregion


// #region assets
import HTTP_CODES from './codes.json';
// #endregion

// #region utils
import config from 'config';
import { helperFindJSON } from 'lib/helpers';
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
import { useJobStore } from 'store/job';
import { useNotificationStore } from 'store/__core__/notifications';
// #endregion


// #region requests
import { EndpointHTTP } from 'lib/requests/http';
import { HTTP_METHODS_ENUMS } from 'lib/requests/http/methods';
import { MESSAGE_ENUM } from 'store/__core__/notifications/model';
// #endregion


function useServiceResumeUpload({ }) {
	// #region references
	// #endregion


	// #region contexts & hooks
	const {
		handlerAddMessage,
	} = useNotificationStore({});

	const {
		job,
	} = useJobStore();
	// #endregion


	// #region variables
	// #endregion


	// #region states
	const [loading, setLoading] = useState(true);
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerGetResumeFiles = async () => {
		/* get the files resume via GET */
		setLoading(true);
		let newStatus;

		const endpoint = config.uploadURL;
		const token = job.access_token;

		try {
			const response = await EndpointHTTP({
				method: HTTP_METHODS_ENUMS.GET,
				token: token,
				endpoint: endpoint,
			});

			if (!response || response?.status !== 200) {
				newStatus = helperFindJSON({
					object: HTTP_CODES,
					property: !response ? 'null' : response.status,
				});

				handlerAddMessage({
					content: {
						icon: 'error',
						title: newStatus?.title,
						label: newStatus?.label,
						allowOutsideClick: false,
						timer: null,
					},
					type: MESSAGE_ENUM.ALERT
				});

				setLoading(false);
				return;
			};

			return response.data;
		} catch (e) {
			console.warn('ocurrio el siguiente error:', e);
		} finally {
			setLoading(false);
		};
	};
	// #endregion


	// #region effects
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		loading,
		handlerGetResumeFiles
	};
	// #endregion
}


export { useServiceResumeUpload };