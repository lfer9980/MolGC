'use client';
/* 
	hook for consume animations via JS
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


// #region reducers & stores
// #endregion


// #region requests
// #endregion


function useActivateAnimation({ interval, animationName }) {
	// #region contexts
	// #endregion


	// #region references
	// #endregion


	// #region variables
	const animationBase = 'animate__animated';
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region states
	const [animation, setAnimation] = useState('');
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	// #endregion


	// #region effects
	useEffect(() => {
		const animate = () => {
			setAnimation('');
			setTimeout(() => setAnimation(animationName), 50);
		};

		animate();

		if (interval > 0) {
			const intervalId = setInterval(animate, interval);
			return () => clearInterval(intervalId);
		};
	}, [interval, animationName]);
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		animation,
		animationBase,
	};
	// #endregion
}


export { useActivateAnimation };