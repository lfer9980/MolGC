'use client';
/* 
	Hook for Delete Job Session on Backend:
	this will delete everything on Database
*/

// #region libraries
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


function useServiceDeleteJob({ }) {
	// #region references
	const router = useRouter();
	// #endregion


	// #region contexts & hooks
	const {
		handlerAddMessage,
	} = useNotificationStore({});

	const {
		job,
		handlerDeleteJobStore,
	} = useJobStore();
	// #endregion


	// #region variables
	// #endregion


	// #region states
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
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
	// #endregion


	// #region effects
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		handlerDeleteJob
	};
	// #endregion
}


export { useServiceDeleteJob };