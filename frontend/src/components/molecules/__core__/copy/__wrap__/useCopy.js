'use client';
/* 
	handles copy functions from Copy component
*/
// #region libraries
import { useState } from 'react';
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


function useCopy({ text, handler }) {
	// #region references
	// #endregion


	// #region contexts & hooks
	// #endregion


	// #region variables
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region states
	const [copied, setCopied] = useState(false);

	const handlerCopy = async () => {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			handler && handler(text);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Error al copiar:', err);
		}
	};
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
		copied,
		handlerCopy,
	};
	// #endregion
}


export { useCopy };