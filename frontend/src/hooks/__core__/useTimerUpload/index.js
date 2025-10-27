'use client';
/* 
	HOOK FOR DEVELOPMENT
	this hook imitates upload progress to a backend or API
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


function useTimerUpload({
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
	const increment = (100 / (timer / stepTime));
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region states
	const [progress, setProgress] = useState(0);
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
				if (prev >= maxValue) {
					if (reset) return 0;

					clearInterval(interval);
					return maxValue;
				}
				return Math.max(prev + increment, 0);
			});
		}, stepTime);

		return () => clearInterval(interval);
	}, [timer, stepTime, increment, maxValue, reset]);
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		progress
	};
	// #endregion
}


export { useTimerUpload };