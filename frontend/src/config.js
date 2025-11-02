/* 
	load enviroment variables securetly from here.
*/
const config = {
	appName: 'MolGC Web App',
	brief: 'Molecular Geometry Comparator',
	description: 'Parse, compare and make reports of your molecules simulation',
	baseURL: process.env.NEXT_PUBLIC_API_URL || '',
	baseWSURL: process.env.NEXT_PUBLIC_API_WS_URL || '',
	version: '1.0.0 - Ambar',
	jobURL: process.env.NEXT_PUBLIC_JOB_URL || '',
	uploadURL: process.env.NEXT_PUBLIC_UPLOAD_URL || '',
	uploadAutoURL: process.env.NEXT_PUBLIC_UPLOAD_AUTO_URL || '',
	uploadManualURL: process.env.NEXT_PUBLIC_UPLOAD_MANUAL_URL || '',
	analysisURL: process.env.NEXT_PUBLIC_ANALYSIS_URL || '',
	analysisWSURL: process.env.NEXT_PUBLIC_ANALYSIS_SOCKET_URL || '',
	reportResumeURL: process.env.NEXT_PUBLIC_REPORT_RESUME_URL || '',
	// cdnURL: process.env.NEXT_PUBLIC_CDN_URL || 'https://cdn.ejemplo.com',
	// defaultLanguage: 'es',
	// auth: {
	// 	sessionTimeout: 3600,
	// },
	// features: {
	// 	enableDarkMode: true,
	// 	enableBetaFeatures: false,
	// },
};

export default config;