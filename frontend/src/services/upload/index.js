'use client';
/*
	Hook for Upload files to API and parse matically.
*/

// #region libraries
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion

// #region utils
import config from 'config';
import { JOB_STATUS_ENUM } from 'lib/enums';
import { helperHasNoEmptyValues, STYLE_LOG_ENUM } from 'lib/helpers';
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


function useServiceUpload({ }) {
	// #region references
	const router = useRouter();
	// #endregion


	// #region contexts & hooks
	const {
		handlerAddMessage,
	} = useNotificationStore({});

	const {
		job,
		handlerUpdateJobStore,
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
	const handlerUploadAutomatic = async ({
		files,
		handlerProgress,
		explicitToken
	}) => {
		/* make upload files automatically via POST */
		setLoading(true);
		const endpoint = config.uploadAutoURL;
		const token = explicitToken || job.access_token;

		if (files.length === 0) {
			handlerAddMessage({
				content: {
					log: STYLE_LOG_ENUM.WARNING,
					title: 'Datos faltantes',
					label: 'Verifica los campos vacíos de tu formulario e intenta nuevamente.',
					labelButton: 'ENTENDIDO',
					timer: 3000,
				},
				type: MESSAGE_ENUM.NOTIFICATION
			});

			setLoading(false);
			return;
		};

		const formData = new FormData();
		for (const file of files) {
			formData.append("zip_file", file);
		};

		try {
			const response = await EndpointHTTP({
				method: HTTP_METHODS_ENUMS.POST,
				token: token,
				endpoint: endpoint,
				form: formData,
				isMultiForm: true,
				onProgress: handlerProgress,
			});

			if (!response || response?.status !== 200) {
				handlerAddMessage({
					content: {
						icon: 'error',
						title: `ERROR ${response.status}`,
						label: response.data?.detail,
						allowOutsideClick: false,
						timer: null,
					},
					type: MESSAGE_ENUM.ALERT
				});

				setLoading(false);
				return;
			};

			const updateJob = {
				status: JOB_STATUS_ENUM.UPLOAD_COMPLETED
			};

			handlerUpdateJobStore({ data: updateJob });

			/* redirect to files resume */
			router.push(`/files`);
		} catch (e) {
			console.warn('ocurrio el siguiente error:', e);
		};
	};

	const handlerUploadManual = async ({ files, metadata, handlerProgress }) => {
		/* make upload files MANUALLY via POST */
		setLoading(true);
		const endpoint = config.uploadManualURL;
		const token = job.access_token;
		const emptyForm = helperHasNoEmptyValues(metadata);

		if (!emptyForm || files.length === 0) {
			handlerAddMessage({
				content: {
					log: STYLE_LOG_ENUM.WARNING,
					title: 'Datos faltantes',
					label: 'Verifica los campos vacíos de tu formulario e intenta nuevamente.',
					labelButton: 'ENTENDIDO',
					timer: 3000,
				},
				type: MESSAGE_ENUM.NOTIFICATION
			});

			setLoading(false);
			return;
		};

		const formData = new FormData();
		for (const file of files) {
			formData.append("file", file);
		};

		formData.append("classification", JSON.stringify(metadata));

		try {
			const response = await EndpointHTTP({
				method: HTTP_METHODS_ENUMS.POST,
				token: token,
				endpoint: endpoint,
				form: formData,
				isMultiForm: true,
				onProgress: handlerProgress,
			});

			if (!response || response?.status !== 200) {
				handlerAddMessage({
					content: {
						icon: 'error',
						title: `ERROR ${response.status}`,
						label: response.data?.detail,
						allowOutsideClick: false,
						timer: null,
					},
					type: MESSAGE_ENUM.ALERT
				});

				setLoading(false);
				return;
			};

			const updateJob = {
				status: JOB_STATUS_ENUM.UPLOAD_COMPLETED
			};

			handlerUpdateJobStore({ data: updateJob });

			/* redirect to files resume */
			router.push(`/files`);
		} catch (e) {
			console.warn('ocurrio el siguiente error:', e);
		};
	};

	const handlerGetResumeFiles = async () => {
		/* get the files resume via GET */
		setLoading(true);
		const endpoint = config.uploadURL;
		const token = job.access_token;

		try {
			const response = await EndpointHTTP({
				method: HTTP_METHODS_ENUMS.GET,
				token: token,
				endpoint: endpoint,
			});

			if (!response || response?.status !== 200) {
				handlerAddMessage({
					content: {
						icon: 'error',
						title: `ERROR ${response.status}`,
						label: response.data?.detail,
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
		handlerUploadAutomatic,
		handlerUploadManual,
		handlerGetResumeFiles,
	};
	// #endregion
}


export { useServiceUpload };
