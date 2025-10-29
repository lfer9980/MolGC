'use client';
/* 
	Hook for Create Job Session on Backend:
	this will save access token on Context
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
import { helperFindJSON } from 'lib/helpers';
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
import { MESSAGE_ENUM } from 'store/__core__/notifications/model';
import { useNotificationStore } from 'store/__core__/notifications';
// #endregion


// #region requests
import { EndpointHTTP } from 'lib/requests/http';
import { HTTP_METHODS_ENUMS } from 'lib/requests/http/methods';
// #endregion


function useServiceCreateJob() {
	// #region references
	// #endregion


	// #region contexts & hooks
	const {
		handlerAddMessage,
	} = useNotificationStore({});
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
	const handlerCreateJob = async ({ uploadType = '', handler }) => {
		/* make th Job Creation via POST */
		setLoading(true);
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

			/* redirect according to upload type */
			handler(`/files/${uploadType}`);
		} catch {
			console.warn('ocurrio el siguiente error:', e);
		} finally {
			setLoading(false);
		}
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
	};
	// #endregion
}


export { useServiceCreateJob };