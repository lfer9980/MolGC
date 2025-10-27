'use client';
/* 
	handles headerX logic
*/

// #region libraries
import { usePathname, useRouter } from 'next/navigation';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
import { splitPathFirstPos } from 'lib/helpers';
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
// #endregion


// #region requests
// #endregion


function useHeader({ locale = 'es-MX' }) {
	// #region references
	// #endregion


	// #region contexts & hooks
	// #endregion


	// #region variables
	const path = usePathname();
	const router = useRouter();
	const rootRef = splitPathFirstPos(path);
	const _today = new Date();

	const formatDate = _today.toLocaleDateString(locale?.name, {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
	// #endregion


	// #region states
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
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		router,
		rootRef,
		formatDate,
	};
	// #endregion
}


export { useHeader };
