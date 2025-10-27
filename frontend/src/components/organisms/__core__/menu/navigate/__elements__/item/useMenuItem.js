'use client';
import { useMenuContext } from 'context/__core__';
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


function useMenuItem({ label = '' }) {
	// #region references
	// #endregion


	// #region contexts & hooks
	const {
		activeSectionRef,
		subscribeActiveSection
	} = useMenuContext();
	// #endregion


	// #region variables
	// #endregion


	// #region states
	const [active, setActive] = useState(activeSectionRef.current === label);
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const scrollTo = (event, target) => {
		/* if the item on menu is scrollable, this search and scroll to the target element */
		event.preventDefault();
		const targetElement = document.getElementById(target);

		if (targetElement) {
			targetElement.scrollIntoView({ behavior: 'smooth', block: `${window?.innerWidth <= 501 ? 'start' : 'end'}` });
			window.history.pushState(null, '', `#${target}`);
		};
	};
	// #endregion


	// #region effects
	useEffect(() => {
		const unsubscribe = subscribeActiveSection((newId) => {
			setActive(newId === label);
		});

		return () => unsubscribe();
	}, [label, subscribeActiveSection]);
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		active,
		scrollTo,
	};
	// #endregion
}


export { useMenuItem };