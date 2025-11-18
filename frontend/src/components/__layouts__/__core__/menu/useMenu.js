'use client';
/*
	handles logic for menu layout, controls searching methods
*/

// #region libraries
import { useState } from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
const _getMenuFlatten = (elements) => {
	const result = []

	elements?.forEach(section => {
		section.elements?.forEach(element => {
			element.references?.forEach(item => {
				result.push({
					label: item.label,
					href: item.href ? item.href : '',
					scroll: item.scroll ? item.scroll : false,
				})
			})
		})
	})

	return result;
}
// #endregion


// #region reducers & stores
// #endregion


// #region requests
// #endregion


function useMenu({ elements = [] }) {
	// #region references
	// #endregion


	// #region contexts & hooks
	// #endregion


	// #region variables
	const items = _getMenuFlatten(elements);
	// #endregion


	// #region states
	const [search, setSearch] = useState('');
	const [results, setResults] = useState([]);
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handleSearch = (text) => {
		setSearch(text);

		if (text.trim() === '') {
			setResults([]);
			return;
		}

		const filtered = items.filter(item =>
			item.label.toLowerCase().includes(text.toLowerCase()) && item?.scroll
		);

		setResults(filtered);
	}
	// #endregion


	// #region effects
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		search,
		results,
		handleSearch,
	};
	// #endregion
}


export { useMenu };
