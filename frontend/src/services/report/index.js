'use client';
/* 
	Hook for get the current generated report. 
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
import { MESSAGE_ENUM } from 'store/__core__/notifications/model';
import { useNotificationStore } from 'store/__core__/notifications';
// #endregion


// #region requests
import { EndpointHTTP } from 'lib/requests/http';
import { HTTP_METHODS_ENUMS } from 'lib/requests/http/methods';
// #endregion



function useServiceReport({ }) {
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
	const handlerGetResumeReport = async () => {
		/* get the report resume via GET */
		let newStatus;

		const endpoint = config.reportResumeURL;
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

	const handlerGetAllReports = async () => {
		/* get the report resume via GET */
		let newStatus;

		const endpoint = config.reportAllURL;
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
		handlerGetResumeReport,
		handlerGetAllReports,
	};
	// #endregion
}


export { useServiceReport };