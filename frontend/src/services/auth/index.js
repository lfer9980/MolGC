'use client';
/* 
	centralize logic for auth
*/
// #region libraries
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// #endregion


// #region components
// #endregion


// #region assets
import HTTP_CODES from './codes.json';
// #endregion

// #region utils
import { EndpointHTTP } from 'lib/requests/http';
import { helperFindJSON } from 'lib/helpers/helperFindJSON';
import { HTTP_METHODS_ENUMS } from 'lib/requests/http/methods';
// #endregion


// #region reducers & stores
import { useSessionStore } from 'store/__core__/session';
import { useNotificationStore } from 'store/__core__/notifications';
import { MESSAGE_ENUM } from 'store/__core__/notifications/model';
// #endregion


// #region requests
// #endregion


function useServiceAuth({ }) {
	// #region references
	// #endregion


	// #region contexts & hooks
	const {
		handlerLogin,
	} = useSessionStore({});

	const {
		handlerAddMessage,
	} = useNotificationStore({});

	// #endregion


	// #region variables
	const router = useRouter();
	// #endregion


	// #region states
	const [loading, setLoading] = useState(false);
	// #endregion


	// #region memos & callbacks
	const handlerRequestPost = async ({ event, endpoint = '/auth', redirect = '/home' }) => {
		/* use for make a POST request */
		try {
			let newStatus;
			const password = event.target.password.value;
			const username = event.target.username.value;

			setLoading(true);

			/* check if password or username is null */
			if (!password || !username) {
				newStatus = helperFindJSON({
					object: HTTP_CODES,
					property: 'empty'
				});

				handlerAddMessage({
					content: {
						icon: 'warning',
						title: newStatus?.title,
						label: newStatus?.label,
						allowOutsideClick: false,
						timer: null,
					},
					type: MESSAGE_ENUM.ALERT
				});

				return;
			};

			/* start request logic */
			const newForm = {
				username: username,
				password: password,
			};

			const response = await EndpointHTTP({
				method: HTTP_METHODS_ENUMS.POST,
				endpoint: endpoint,
				form: newForm,
				isQS: true,
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


			/* if everything goes well, set session here */
			handlerLogin({ data: response.data });
			return router(redirect);

		} catch (e) {
			console.warn('ocurrio el siguiente error:', e);

		} finally {
			setLoading(false);
		};
	};
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	// #endregion


	// #region effects
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		loading,
		handlerRequestPost,
	};
	// #endregion
}


export { useServiceAuth };