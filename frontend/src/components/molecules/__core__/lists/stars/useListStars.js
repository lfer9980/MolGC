'use client';
/*
	handles logic for list stars componentes, evaluates the actual score, and changes if interaction is active.
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


function useListStars({
	value,
	handler,
}) {
	// #region references
	// #endregion


	// #region contexts & hooks
	// #endregion


	// #region variables
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region states
	const [rating, setRating] = useState(value);
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerClickRate = (event, index) => {
		const { left, width } = event.currentTarget.getBoundingClientRect();
		const clickX = event.clientX - left;
		const isHalf = clickX < width / 2;
		const newRating = index + (isHalf ? 0.5 : 1);

		setRating(newRating);
		handler && handler(newRating);
	};

	// #endregion


	// #region effects
	// #endregion


	// #region others
	const _getStars = (value) => {
		const full = Math.floor(value);
		const half = value % 1 !== 0 ? 1 : 0;
		const empty = 5 - full - half;

		return ([
			...Array(full).fill('full'),
			...Array(half).fill('half'),
			...Array(empty).fill('empty')
		]);
	};

	const stars = _getStars(rating);
	// #endregion


	// #region main
	return {
		rating,
		stars,
		handlerClickRate,
	};
	// #endregion
}


export { useListStars };
