'use client';
/*
	handles logic for breadcrumbs
*/
// #region libraries
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion

// #region utils
import { assignPathName, splitPath } from 'lib/helpers';
// #endregion


// #region reducers & stores
// #endregion


// #region requests
// #endregion


function useBread({ }) {
	// #region references
	// #endregion


	// #region contexts & hooks
	// #endregion


	// #region variables
	const path = usePathname();
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region states
	const [crumbs, setCrumbs] = useState([]);
	const [names, setNames] = useState([]);
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	// #endregion


	// #region effects
	useEffect(() => {
		const pathName = splitPath(path);
		const renamedPathName = assignPathName(pathName);

		setCrumbs(pathName);
		setNames(renamedPathName);
	}, [path]);
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		names,
		crumbs,
	};
	// #endregion
}


export { useBread };
