'use client';
/* 
	Hook for Create Analysis Work, this will be return a socket channel.
*/

// #region libraries
import { useState } from 'react';
// #endregion


// #region components
// #endregion


// #region assets
import config from 'config';
import HTTP_CODES from './codes.json';
// #endregion

// #region utils
import { JOB_STATUS_ENUM } from 'lib/enums';
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



function useServiceAnalysis({ }) {
	// #region references
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
	const [messages, setMessages] = useState({ progress: 0, message: '' });
	const [isConnected, setIsConnected] = useState(false);
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerCreateAnalysis = async () => {
		/* make the Job Creation via POST */
		setLoading(true);
		let newStatus;
		const token = job.access_token;
		const endpoint = config.analysisURL;

		try {
			const response = await EndpointHTTP({
				method: HTTP_METHODS_ENUMS.POST,
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
					},
					type: MESSAGE_ENUM.ALERT
				});
				return;
			};

			const status = { status: JOB_STATUS_ENUM.ANALYSIS };
			handlerUpdateJobStore({ data: status });
		} catch (e) {
			console.warn('ocurrio el siguiente error:', e);
		};
	};

	const handlerGetAnalysis = async () => {
		const token = job.access_token;

		if (!token) {
			handlerAddMessage({
				content: {
					icon: 'error',
					allowOutsideClick: false,
					timer: null,
				},
				type: MESSAGE_ENUM.ALERT
			});

			return;
		};

		const wsURL = `${config.baseWSURL}${config.analysisWSURL}?token=${token}`;
		const socket = new WebSocket(wsURL);

		socket.onopen = () => {
			setIsConnected(true);
		};

		socket.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data);

				if (data?.type === "final" || data?.status === "DONE") {
					setMessages({
						progress: 100,
						message: data?.message
					});

					socket.close(1000);

					setTimeout(() => {
						const status = { status: JOB_STATUS_ENUM.COMPLETED };
						handlerUpdateJobStore({ data: status });
					}, 3000);

					return;
				};

				setMessages({
					progress: data.progress,
					message: data?.message
				});
			} catch {
				console.log("Mensaje recibido:", event.data);
			}
		};

		socket.onerror = (error) => {
			handlerAddMessage({
				content: {
					icon: 'error',
					allowOutsideClick: false,
					timer: null,
				},
				type: MESSAGE_ENUM.ALERT
			});

		};

		socket.onclose = (event) => {
			setIsConnected(false);

			if (event.code === 1000) {
				return;
			}

			setTimeout(() => handlerGetAnalysis(), 3000);
		};

		return () => {
			socket.close();
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
		messages,
		isConnected,
		handlerCreateAnalysis,
		handlerGetAnalysis,
	};
	// #endregion
}


export { useServiceAnalysis };