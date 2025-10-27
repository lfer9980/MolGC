/* 
	ROUTES - routename | LAYOUT
*/

// #region libraries
import React from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
import config from 'config';
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
// #endregion


// #region styles
// #endregion


export const metadata = {
	title: `${config.appName} | ${config.brief}`,
	description: `${config.description}`,
};


export default function Layout({
	children,
}) {
	// #region contexts
	// #endregion


	// #region references
	// #endregion


	// #region variables
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region states
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	// #endregion


	// #region effects
	// #endregion


	// #region others
	// #endregion


	// #region theme
	// #endregion


	// #region main
	return (
		<div className={''}>
			{children}
		</div>
	);
	// #endregion
};