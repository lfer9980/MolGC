/* 
	Load environment variables securely from here.
*/

// Helper para construir WebSocket URL dinámicamente
const getWSURL = () => {
	if (typeof window === 'undefined') return '';
	const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
	return `${protocol}//${window.location.host}`;
};

const baseURL = process.env.NEXT_PUBLIC_API_URL || '';
const baseWSURL = typeof window !== 'undefined' ? getWSURL() + baseURL : '';

const config = {
	appName: 'MolGC Web App',
	brief: 'Molecular Geometry Comparator',
	description: 'Parse, compare and make reports of your molecules simulation',
	version: '1.0.0 - Ambar',

	// Base URLs
	baseURL: baseURL,
	baseWSURL: baseWSURL,

	// API Endpoints (construidos a partir de baseURL)
	jobURL: `${baseURL}/job/v1/`,
	uploadURL: `${baseURL}/upload/v1/`,
	uploadAutoURL: `${baseURL}/upload/v1/automatic`,
	uploadManualURL: `${baseURL}/upload/v1/manual`,
	analysisURL: `${baseURL}/analysis/v1/`,
	analysisWSURL: `${baseURL}/analysis/v1/ws`,
	reportResumeURL: `${baseURL}/report/v1/resume`,
};

export default config;