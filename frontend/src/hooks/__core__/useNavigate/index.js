'use client';
/*
	Hook for element:
	brief description about what this hook does
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


// #region hooks
// #endregion


// #region contexts & stores
// #endregion


// #region requests
// #endregion


function useNavigate({ ref, pages }) {
	// #region references
	// #endregion


	// #region contexts & hooks
	// #endregion


	// #region variables
	// #endregion


	// #region states
	const [nav, setNav] = useState(1);
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerNav = ({ type = 'next' }) => {
		let newValue = nav;

		if (type === 'next' && nav < pages) newValue = nav + 1;
		else if (type === 'back' && nav !== 0) newValue = nav - 1;

		setNav(newValue);

		/* set to top the current page form */
		ref.current.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		})
	};
	// #endregion


	// #region effects
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		nav,
		handlerNav
	};
	// #endregion
}


export { useNavigate };
