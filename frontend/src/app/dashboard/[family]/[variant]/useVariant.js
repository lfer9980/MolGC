'use client';
/* 
	Hook for get and render all information related to report for specific family/variant: 
*/

// #region libraries
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
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

	const { family, variant } = params;
	// #endregion


	// #region states
	const [nav, setNav] = useState(0);
	const [tabs, setTabs] = useState([]);
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);
	// #endregion


	// #region memos & callbacks
	const handlerRequests = useCallback(async ({ family, variant }) => {
		const token = job?.access_token;

		if (family && variant && job?.resume) {
			const resume = JSON.parse(job?.resume);
			const endpoints = getReportUrls(resume, family, variant);

			const results = await Promise.allSettled(
				endpoints.map((item) => EndpointHTTP({
					token: token,
					method: HTTP_METHODS_ENUMS.GET,
					endpoint: `${config.reportURL}${item?.url}`
				}))
			);

			const formatted = results.reduce((acc, result, index) => {
				const endpoint = endpoints[index];

				acc[endpoint.type] = {
					id: endpoint.id,
					status: result.status,
					data:
						result.status === 'fulfilled'
							? result.value.data.data
							: result.reason,
				};

				return acc;
			}, {});

			const keys = Object.keys(formatted);
			if (keys.includes('mae_general')) setTabs(TABS_GENERAL);
			else if (keys.includes('mae_family')) setTabs(TABS_FAMILY);
			else setTabs(TABS_VARIANT);

			setData(formatted);
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (nav === 1) {
			setTimeout(() => window.dispatchEvent(new Event("resize")), 150);
		}
	}, [nav]);
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerNav = (value) => setNav(value);
	console.log(data)
	// #endregion


	// #region effects
	useEffect(() => {
		handlerRequests({
			family: family,
			variant: variant
		});
	}, [family, variant]);
	// #endregion


	// #region others
	console.log(data);
	// #endregion


	// #region main
	return {
		tabs,
		job,
		nav,
		data,
		variant,
		loading,
		handlerNav
	};
	// #endregion
}


export { useVariant };