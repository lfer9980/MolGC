'use client';
/* 
	Hook for get and render all information related to report for specific family/variant: 
*/

// #region libraries
import { useParams } from 'next/navigation';
import {
	useCallback,
	useEffect,
	useMemo,
	useState
} from 'react';
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
	const [records, setRecords] = useState({});
	const [loading, setLoading] = useState(true);
	const [plotMounted, setPlotMounted] = useState(false);
	const [shouldMountPlot, setShouldMountPlot] = useState(false);
	const [isPlotLoading, setIsPlotLoading] = useState(false);
	// #endregion


	// #region memos & callbacks
	const resumeMemo = useMemo(() => {
		try {
			return job?.report_resume ? JSON.parse(job.report_resume) : null;
		} catch {
			return null;
		}
	}, [job?.report_resume]);


	const handlerRequestsCallback = useCallback(async (family, variant, token, resume) => {
		if (!family || !variant || !resume) return;

		const endpoints = getReportUrls(resume, family, variant);

		const requests = endpoints.map((item) =>
			EndpointHTTP({
				token,
				method: HTTP_METHODS_ENUMS.GET,
				endpoint: `${config.reportURL}${item.url}`,
			})
		);

		const results = await Promise.allSettled(requests);

		const grouped = {};
		for (const item of results) {
			const status = item.status;

			const payload =
				status === "fulfilled"
					? item.value?.data
					: item.reason?.response?.data || item.reason;

			const fam = payload?.family || "Reporte General";
			const varName = payload?.variant || "General";

			grouped[fam] = grouped[fam] || {};
			grouped[fam][varName] = grouped[fam][varName] || [];

			grouped[fam][varName].push({
				...payload,
				request_status: status,
			});
		}

		const children = Object.entries(grouped).map(([familyName, variantsDict]) => ({
			family: familyName,
			children: Object.entries(variantsDict).map(([variantName, reports]) => ({
				variant: variantName,
				children: reports,
			})),
		}));

		const firstFamily = children?.[0];
		const firstVariant = firstFamily?.children?.[0];

		const root = firstFamily && firstVariant
			? {
				family: firstFamily.family,
				variant: firstVariant.variant,
				children: firstVariant.children,
			}
			: null;

		// Tabs (igual que antes)
		const allReportTypes = results
			.map((r) => (r.status === "fulfilled" ? r.value?.data?.type : null))
			.filter(Boolean);

		setTabs(
			allReportTypes.includes("mae_general")
				? TABS_GENERAL
				: allReportTypes.includes("mae_family")
					? TABS_FAMILY
					: TABS_VARIANT
		);

		setRecords({
			children,
			root,
		});

		setLoading(false);
	}, []);
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerNav = (value) => setNav(value);

	const handlerPlotMounted = () => {
		setIsPlotLoading(false);
		setPlotMounted(true);
	};
	// #endregion


	// #region effects
	useEffect(() => {
		if (nav === 1 && plotMounted) {
			const id = setTimeout(() => window.dispatchEvent(new Event("resize")), 300);
			return () => clearTimeout(id);
		}
	}, [nav, plotMounted]);

	useEffect(() => {
		if (!job?.report_resume) return;
		handlerRequestsCallback(family, variant, job.access_token, resumeMemo);
	}, [family, variant, job?.access_token]);

	useEffect(() => {
		if (nav === 1 && !plotMounted) {
			setIsPlotLoading(true);

			requestAnimationFrame(() => {
				setTimeout(() => {
					setShouldMountPlot(true);
				}, 50);
			});
		}
	}, [nav, plotMounted]);

	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		tabs,
		job,
		nav,
		records,
		family,
		variant,
		loading,
		isPlotLoading,
		shouldMountPlot,
		handlerPlotMounted,
		handlerNav
	};
	// #endregion
}


export { useVariant };