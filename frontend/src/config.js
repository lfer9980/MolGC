/* 
	load enviroment variables securetly from here.
*/
const config = {
	appName: 'MolGC Web App',
	brief: 'Molecular Geometry Comparator',
	description: 'Parse, compare and make reports of your molecules simulation',
	baseURL: process.env.NEXT_PUBLIC_API_URL || '',
	version: '1.0.0 - Ambar',
	jobURL: process.env.NEXT_PUBLIC_JOB_URL || '',
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