'use client';
/* 
	HOOK FOR DEVELOPMENT or AUTOMATIC CLOSING
	centralize timing events
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


function useTimerClose({
	timer,
	maxValue = 100,
	stepTime = 1000,
	reset = false
}) {
	// #region contexts
	// #endregion


	// #region references
	// #endregion


	// #region variables
	const decrement = (100 / (timer / stepTime));
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region states
	const [progress, setProgress] = useState(maxValue);
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	// #endregion


	// #region effects
	useEffect(() => {
		const interval = setInterval(() => {
			if (timer) setProgress((prev) => {
				if (prev <= 0) {
					if (reset) return maxValue;

					clearInterval(interval);
					return 0;
				}
				return Math.max(prev - decrement, 0);
			});
		}, stepTime);

		return () => clearInterval(interval);
	}, [timer, decrement, stepTime, reset, maxValue]);
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		progress
	};
	// #endregion
}


export { useTimerClose };