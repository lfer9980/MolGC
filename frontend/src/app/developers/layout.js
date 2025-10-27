'use client';
/*
	ROUTES - DEVELOPERS | LAYOUT
*/

// #region libraries
import React from 'react';
// #endregion


// #region components
import { HeaderMolGC } from 'components/organisms';
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
import { WrapMain } from 'components/__common__';
// #endregion


// #region contexts & stores
// #endregion


// #region styles
// #endregion


export default function DocsLayout({ children }) {
	// #region hooks & others
	// #endregion

	// #region main UI
	return (
		<>
			<HeaderMolGC second />
			<WrapMain margin padding>
				{children}
			</WrapMain>
		</>
	);
	// #endregion
};