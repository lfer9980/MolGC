'use client';
/*
	handles logic for open Banner Alert
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
import { useTimerClose } from 'hooks';
// #endregion


// #region reducers & stores
// #endregion


// #region requests
// #endregion


function useBannerAlert({
	id,
	timer,
	handlerClose
}) {
	// #region contexts
	// #endregion


	// #region references
	// #endregion


	// #region variables
	const maxValue = 100;
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region states
	const [animation, setAnimation] = useState('animate__fadeInUp');
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const { progress } = useTimerClose({
		timer: timer,
		maxValue: maxValue,
	});
	// #endregion


	// #region effects
	useEffect(() => {
		if (progress === 0 && handlerClose) {
			setAnimation('animate__fadeOutUp');

			const timeout = setTimeout(() => {
				handlerClose(id);
			}, 1000);

			return () => clearTimeout(timeout);
		}
	}, [progress, handlerClose, id]);
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		animation,
		maxValue,
		progress
	};
	// #endregion
}


export { useBannerAlert };
