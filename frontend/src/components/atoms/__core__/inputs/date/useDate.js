'use client';
/* 
	handler logic for selection date, restriccions and allow past
*/

// #region libraries
import { useEffect, useState } from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion

// #region utils
import { helperFormatDate } from 'lib/helpers';
// #endregion


// #region reducers & stores
// #endregion


// #region requests
// #endregion


function useDate({
	defaultValue,
	min,
	max,
	noPast = false
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
	const [minDate, setMinDate] = useState('');
	const [maxDate, setMaxDate] = useState('');
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	// #endregion


	// #region effects
	useEffect(() => {
		const defaultDate = new Date(defaultValue);
		const minFecha = new Date();
		const maxFecha = new Date();

		if (min && !noPast) {
			minFecha.setDate(defaultDate.getDate() - min);
			setMinDate(helperFormatDate(minFecha));
		}

		if (!min && noPast) {
			minFecha.setDate(defaultDate.getDate() + 1);
			setMinDate(helperFormatDate(minFecha));
		}

		if (max) {
			maxFecha.setDate(defaultDate.getDate() + max);
			setMaxDate(helperFormatDate(maxFecha));
		}
	}, [defaultValue, min, max, noPast]);
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		minDate,
		maxDate,
	};
	// #endregion
}


export { useDate };