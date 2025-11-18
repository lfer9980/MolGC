'use client';
/*
	Hook for sort data asc and desc:
	use this hook for order data
*/

// #region libraries
import { useMemo, useState } from 'react';
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


function useSort({ data = [] }) {
	// #region references
	// #endregion


	// #region contexts & hooks
	// #endregion


	// #region variables
	// #endregion


	// #region states
	const [sort, setSort] = useState({ key: '', direction: 'asc' });
	// #endregion


	// #region memos & callbacks
	const sortedData = useMemo(() => {
		if (!sort.key) return data;

		const result = [...data];

		result.sort((a, b) => {
			let valA = a[sort.key];
			let valB = b[sort.key];

			const numA = parseFloat(valA);
			const numB = parseFloat(valB);
			const bothNumeric = !isNaN(numA) && !isNaN(numB);

			if (bothNumeric) {
				valA = numA;
				valB = numB;
			} else {
				valA = valA != null ? String(valA).toLowerCase() : '';
				valB = valB != null ? String(valB).toLowerCase() : '';
			}

			if (valA < valB) return sort.direction === 'asc' ? -1 : 1;
			if (valA > valB) return sort.direction === 'asc' ? 1 : -1;

			return 0;
		});

		return result;
	}, [data, sort.key, sort.direction]);

	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerSort = (key) => {
		setSort(prev => ({
			key,
			direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
		}));
	};


	const handlerResetSort = () => setSort({ key: '', direction: 'asc' });
	// #endregion


	// #region effects
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		sort,
		sortedData,
		handlerSort,
		handlerResetSort,
	};
	// #endregion
}


export { useSort };
