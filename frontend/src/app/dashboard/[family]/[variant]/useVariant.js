'use client';
/* 
	Hook for get and render all information related to report for specific family/variant: 
*/

// #region libraries
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion

// #region utils
import config from 'config';
import { getReportUrls } from 'lib/helpers';
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
import { useJobStore } from 'store/job';
// #endregion


// #region requests
import { EndpointHTTP } from 'lib/requests/http';
import { HTTP_METHODS_ENUMS } from 'lib/requests/http/methods';
// #endregion


const TABS_VARIANT = [
	{
		symbol: 'bar_chart',
		label: 'Graficas',
	},
	{
		symbol: 'deployed_code',
		label: 'Vista 3D',
	},
];

const TABS_FAMILY = [
	{
		symbol: 'bar_chart',
		label: 'Graficas',
	},
];

const TABS_GENERAL = [
	{
		symbol: 'bar_chart',
		label: 'Graficas',
	},
	{
		symbol: 'table',
		label: 'TOPSIS',
	},
];

function useVariant({ }) {
	// #region references
	const params = useParams();
	// #endregion 


	// #region contexts & hooks
	const {
		job,
	} = useJobStore();
	// #endregion


	// #region variables
	const { family, variant } = params;
	// #endregion


	// #region states
	const [nav, setNav] = useState(0);
	const [tabs, setTabs] = useState([]);
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);
	// #endregion


	// #region memos & callbacks
	const resumeMemo = useMemo(() => {
		try {
			return job?.resume ? JSON.parse(job.resume) : null;
		} catch {
			return null;
		}
	}, [job?.resume]);

	const handlerRequests = useCallback(async (family, variant, token, resume) => {
		if (!family || !variant || !resume) return;

		const endpoints = getReportUrls(resume, family, variant);
		const requests = endpoints.map((item) =>
			EndpointHTTP({
				token,
				method: HTTP_METHODS_ENUMS.GET,
				endpoint: `${config.reportURL}${item.url}`
			})
		);

		const results = await Promise.allSettled(requests);

		const formatted = endpoints.reduce((acc, endpoint, i) => {
			const result = results[i];
			acc[endpoint.type] = {
				id: endpoint.id,
				status: result.status,
				data: result.status === 'fulfilled'
					? result.value.data.data
					: result.reason
			};
			return acc;
		}, { metadata: { family, variant } });

		const keys = Object.keys(formatted);
		setTabs(
			keys.includes('mae_general')
				? TABS_GENERAL
				: keys.includes('mae_family')
					? TABS_FAMILY
					: TABS_VARIANT
		);

		setData(formatted);
		setLoading(false);
	}, []);
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerNav = (value) => setNav(value);
	// #endregion


	// #region effects
	useEffect(() => {
		if (nav === 1) {
			const id = setTimeout(() => window.dispatchEvent(new Event("resize")), 300);
			return () => clearTimeout(id);
		}
	}, [nav]);

	useEffect(() => {
		if (!job?.resume) return;
		handlerRequests(family, variant, job.access_token, resumeMemo);
	}, [family, variant, job?.access_token]);
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		tabs,
		job,
		nav,
		data,
		family,
		variant,
		loading,
		handlerNav
	};
	// #endregion
}


export { useVariant };