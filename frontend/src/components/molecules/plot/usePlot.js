'use client';
/* 
	Hook for element: 
	brief description about what this hook does
*/

// #region libraries
import { useEffect, useState } from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
// #endregion


// #region requests
// #endregion


function usePlot({ }) {
	// #region references
	// #endregion


	// #region contexts & hooks
	// #endregion


	// #region variables
	// #endregion


	// #region states
	const [isSmall, setIsSmall] = useState(window.innerWidth < 768);
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	// #endregion


	// #region effects
	useEffect(() => {
		const handleResize = () => setIsSmall(window.innerWidth < 768);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		isSmall
	};
	// #endregion
}


export { usePlot };