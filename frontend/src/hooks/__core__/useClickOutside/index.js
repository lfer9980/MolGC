/* 
	hook for handling outside click and listens to escape event for close menu
*/
// #region libraries
import { useCallback, useEffect } from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion

// #region utils
// #endregion


// #region reducers & stores
// #endregion


// #region requests
// #endregion


function useClickOutside({
	ref,
	handler,
	enabled = true
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
	const handleClickOutside = useCallback((event) => {
		ref.current && !ref.current.contains(event.target) && handler && handler(false);
	}, [handler, ref]);

	const handleEscape = useCallback((event) => {
		event.key === 'Escape' && handler && handler();
	}, [handler]);
	// #endregion


	// #region effects
	/* when click outside, the element closes or disappear */
	useEffect(() => {
		if (!enabled) return;

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscape);
		}
	}, [enabled, handleClickOutside, handleEscape]);
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {};
	// #endregion
}


export { useClickOutside };