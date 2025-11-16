/* 
	ROUTES - APP | LAYOUT
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
// #endregion


// #region assets
/* change fonts here and to html classname */
import { nunito, openSans } from 'static/fonts';
// #endregion


// #region utils
import config from 'config';
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
import { JobStoreProvider } from 'store/job';
import { ThemeStoreProvider } from 'context';
import { ObserverProvider } from 'context';
import { NotificationStoreProvider } from 'store/__core__/notifications';
// #endregion


// #region styles
import 'animate.css';
import 'material-symbols';
import 'styles/index.scss';
import 'react-loading-skeleton/dist/skeleton.css';
// #endregion


/* set here the data about the app when you share the app or url */
export const metadata = {
	title: `${config.appName} | ${config.brief}`,
	description: `${config.description}`,
};

export default function RootLayout({ children }) {
	// #region hooks & others
	// #endregion


	//#region main UI
	return (
		<html className={`${nunito.variable} ${openSans.variable}`} lang='es-MX'>
			<body className='theme-dark'>
				<ObserverProvider>
					<JobStoreProvider>
						<ThemeStoreProvider>
							<NotificationStoreProvider>
								{children}
								<div id='portal' />
							</NotificationStoreProvider>
						</ThemeStoreProvider>
					</JobStoreProvider>
				</ObserverProvider>
			</body>
		</html >
	);
	//#endregion
};