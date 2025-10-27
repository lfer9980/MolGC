/*
put all your local fonts in this file 
*/
import localFont from 'next/font/local';

/* 
These lines of code are defining font configurations using font families from Google Fonts.
Each font configuration specifies the subsets, weights, and CSS variable name for the font.
*/
export const nunito = localFont({
	src: [
		{ path: 'nunito-sans-regular.woff2', weight: '400' },
		{ path: 'nunito-sans-200.woff2', weight: '200' },
		{ path: 'nunito-sans-300.woff2', weight: '300' },
		{ path: 'nunito-sans-500.woff2', weight: '500' },
		{ path: 'nunito-sans-600.woff2', weight: '600' },
		{ path: 'nunito-sans-700.woff2', weight: '700' },
		{ path: 'nunito-sans-800.woff2', weight: '800' },
		{ path: 'nunito-sans-900.woff2', weight: '900' },
	],
	variable: '--font-nunito',
});


export const openSans = localFont({
	src: [
		{ path: 'open-sans-regular.woff2', weight: '400' },
		{ path: 'open-sans-300.woff2', weight: '300' },
		{ path: 'open-sans-500.woff2', weight: '500' },
		{ path: 'open-sans-600.woff2', weight: '600' },
		{ path: 'open-sans-700.woff2', weight: '700' },
		{ path: 'open-sans-800.woff2', weight: '800' },
	],
	variable: '--font-open-sans',
});