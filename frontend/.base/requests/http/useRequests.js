/*
this Hook is for put in apart the bussiness logic of the component and UI structure
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion

// #region utils
import { EndpointHTTP } from 'utils/endpoints';
// #endregion


// #region reducers & stores
// #endregion


// #region requests
// #endregion


function useRequests({ method, endpoint }) {
	// #region contexts
	// #endregion


	// #region references
	// #endregion


	// #region variables
	const response = EndpointHTTP({
		method: method,
		endpoint: endpoint,
	});

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


	// #region main
	return {
		response,
	};
	// #endregion
}


export { useRequests };
