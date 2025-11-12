'use client';
/* 
	Hook for handle CRUD Job Session on Backend
*/

// #region libraries
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// #endregion


// #region components
// #endregion


// #region assets
import config from 'config';
import HTTP_CODES from './codes.json';
// #endregion

// #region utils
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


function useServiceJob({ }) {
	// #region references
	const router = useRouter();
	// #endregion


	// #region contexts & hooks
	const {
		handlerAddMessage,
	} = useNotificationStore({});

	const {
		job,
		handlerCreateJobStore,
		handlerUpdateJobStore,
		handlerDeleteJobStore
	} = useJobStore();
	// #endregion


	// #region variables
	// #endregion


	// #region states
	const [loading, setLoading] = useState(false);
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerCreateJob = async ({ uploadType = '', redirect = true }) => {
		/* make the Job Creation via POST */
		setLoading(true);
		let newStatus;
		const endpoint = config.jobURL;
		const JSONData = { "upload_type": uploadType };

		try {
			const response = await EndpointHTTP({
				method: HTTP_METHODS_ENUMS.POST,
				endpoint: endpoint,
				form: JSONData,
				isJSON: true,
			});

			/* handles if response status is null or not OK */
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
				return;
			};

			handlerCreateJobStore({ data: response.data });
			/* redirect according to upload type */
			if (redirect) router.push(`/files/${uploadType}`);

			return response.data.access_token;
		} catch {
			console.warn('ocurrio el siguiente error:', e);
		} finally {
			setLoading(false);
		}
	};

	const handlerUpdateJob = async ({ data }) => {
		/* make the Job Creation via POST */
		setLoading(true);
		let newStatus;
		const token = job.access_token;
		const endpoint = config.jobURL;

		try {
			const response = await EndpointHTTP({
				method: HTTP_METHODS_ENUMS.PUT,
				endpoint: endpoint,
				form: data,
				token: token,
				isJSON: true,
			});

			/* handles if response status is null or not OK */
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
				return;
			};

			handlerUpdateJobStore({ data: response.data });
		} catch {
			console.warn('ocurrio el siguiente error:', e);
		};
	};

	const handlerDeleteJob = async () => {
		/* make the Job DELETION via DELETE */
		let newStatus;
		const endpoint = config.jobURL;
		const token = job.access_token;

		try {
			const response = await EndpointHTTP({
				method: HTTP_METHODS_ENUMS.DELETE,
				endpoint: endpoint,
				token: token,
			});

			/* handles if response status is null or not OK */
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
						navigateTo: '/',
					},
					type: MESSAGE_ENUM.ALERT
				});
				return;
			};

			handlerDeleteJobStore();
			router.push(`/`);
		} catch (e) {
			console.warn('ocurrio el siguiente error:', e);
		};
	};


	const handlerValidateJob = async () => {
		let newStatus;
		const endpoint = config.jobURL;
		const token = job.access_token;

		try {
			const response = await EndpointHTTP({
				method: HTTP_METHODS_ENUMS.GET,
				endpoint: endpoint,
				token: token,
			});

			/* handles if response status is null or not OK */
			if (!response || response?.status !== 200) {
				newStatus = helperFindJSON({
					object: HTTP_CODES,
					property: !response ? 'null' : response.status,
				});

				handlerDeleteJobStore();
				return false;
			};

			return true;
		} catch (e) {
			console.warn('ocurrio el siguiente error:', e);
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
		handlerCreateJob,
		handlerUpdateJob,
		handlerDeleteJob,
		handlerValidateJob,
	};
	// #endregion
}


export { useServiceJob };