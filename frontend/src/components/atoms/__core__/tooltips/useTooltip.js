'use client';
/*
	handles logic for control tooltip Close component
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


function useTooltip({ }) {
	// #region contexts
	// #endregion


	// #region references
	// #endregion


	// #region variables
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region states
	const [show, setShow] = useState(false);
	const [visible, setVisible] = useState(false);
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handleShowLabel = (value) => {
		if (value) {
			setShow(true);
			setTimeout(() => setVisible(true), 50);
		} else {
			setVisible(false);
			setTimeout(() => setShow(false), 300);
		};
	};
	// #endregion


	// #region effects
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		show,
		visible,
		handleShowLabel
	};
	// #endregion
}


export { useTooltip };
