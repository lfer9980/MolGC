'use client';
/* 
	Hook for configuration page
*/

// #region libraries
import { useRouter } from 'next/navigation';
import { useEffect, useReducer, useState } from 'react';
// #endregion


// #region components
// #endregion


// #region assets
import { ANALYSIS_OPTIONS } from 'lib/data/options/analysis';
// #endregion


// #region utils
import { JOB_STATUS_ENUM } from 'lib/enums';
import {
	helperHasNoEmptyValues,
	STYLE_LOG_ENUM
} from 'lib/helpers';
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
import { useJobStore } from 'store/job';
import { useServiceJob } from 'services/job';
import { MESSAGE_ENUM } from 'store/__core__/notifications/model';
import { useNotificationStore } from 'store/__core__/notifications';
// #endregion


// #region requests
// #endregion


function useConfiguration({ }) {
	// #region references
	const router = useRouter();
	// #endregion


	// #region contexts & hooks
	const {
		job,
	} = useJobStore();

	const {
		handlerUpdateJob,
	} = useServiceJob({});

	const {
		handlerAddMessage,
	} = useNotificationStore({});
	// #endregion


	// #region variables
	const REFERENCES = JSON.parse(job.references);

	const INITIAL_CONFIG = {
		analysis_type: ANALYSIS_OPTIONS[0],
		reference: '',
		status: JOB_STATUS_ENUM.READY,
	};

	const ACTION_REDUCER_CONFIG = {
		UPDATE: 'update',
	};

	const ReducerConfig = (state, action) => {
		let newState;
		switch (action.type) {
			case ACTION_REDUCER_CONFIG.UPDATE:
				newState = { ...state, ...action.payload }
				return newState;

			default:
				return state;
		};
	};
	// #endregion


	// #region states

	const [viewReference, setViewReference] = useState(false);
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	const [config, dispatchConfig] = useReducer(ReducerConfig, INITIAL_CONFIG);
	// #endregion


	// #region handlers
	const handlerStartAnalysis = async () => {
		if (helperHasNoEmptyValues(config)) {
			await handlerUpdateJob({ data: config });
		}
		else {
			handlerAddMessage({
				content: {
					log: STYLE_LOG_ENUM.WARNING,
					title: 'Revisa los campos de tu formulario',
					label: 'Algunos datos no fueron completados de forma correcta...',
					labelButton: 'ENTENDIDO',
					timer: 5000,
				},
				type: MESSAGE_ENUM.NOTIFICATION
			});
		};
	};
	// #endregion


	// #region effects
	useEffect(() => {
		setViewReference(config.analysis_type === ANALYSIS_OPTIONS[0])
	}, [config.analysis_type]);
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		router,
		config,
		viewReference,
		dispatchConfig,
		REFERENCES,
		ACTION_REDUCER_CONFIG,
		handlerStartAnalysis,
	};
	// #endregion
}


export { useConfiguration };