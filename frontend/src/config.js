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
const baseWSURL = typeof window !== 'undefined' ? getWSURL() + baseURL : '/api';

const config = {
	appName: 'MolGC Web App',
	brief: 'Molecular Geometry Comparator',
	description: 'Parse, compare and make reports of your molecules simulation',
	version: '1.0.0 - Ambar',

	// Base URLs
	baseURL,
	baseWSURL,

	// API Endpoints (construidos a partir de baseURL)
	jobURL: `/job/v1/`,
	uploadURL: `/upload/v1/`,
	uploadAutoURL: `/upload/v1/automatic`,
	uploadManualURL: `/upload/v1/manual`,
	analysisURL: `/analysis/v1/`,
	analysisWSURL: `/analysis/v1/ws`,
	reportResumeURL: `/report/v1/resume`,
};

export default config;