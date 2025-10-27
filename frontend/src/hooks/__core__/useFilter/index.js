'use client';
/* 
	Hook for filter data: 
	use this filter for filter with a search term or a specific category
*/

// #region libraries
import {
	useDeferredValue,
	useEffect,
	useMemo,
	useState
} from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion

// #region utils
import { helperAutomaticCategories } from 'lib/helpers';
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
// #endregion


// #region requests
// #endregion


function useFilter({
	data = [],
	minRepeat = 2,
	initialKey = ''
}) {
	// #region references
	// #endregion


	// #region contexts & hooks
	// #endregion


	// #region variables
	// #endregion


	// #region states
	const [category, setCategory] = useState({ key: initialKey, value: '' });
	const [categoryOptions, setCategoryOptions] = useState([]);

	const [valueSearched, setvalueSearched] = useState('');
	const deferredTerm = useDeferredValue(valueSearched);

	const [categorySearched, setCategorySearched] = useState(initialKey);
	// #endregion


	// #region memos & callbacks
	const filteredData = useMemo(() => {
		const term = deferredTerm.toLowerCase();

		return data.filter(item => {
			if (category.key && category.value && String(item[category.key]) !== String(category.value)) return false;

			if (term && categorySearched) {
				const field = item[categorySearched];
				return field && String(field).toLowerCase().includes(term);
			};

			return true;
		});

	}, [data, category, deferredTerm, categorySearched]);
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerValueSearched = (value) => setvalueSearched(value);
	const handlerCategorySearched = (key) => setCategorySearched(key);

	const handlerResetFilters = () => setCategory(prev => ({ ...prev, value: '' }));
	const handlerCategory = ({ key, value }) => setCategory(
		prev => ({
			key: key ? key : prev.key,
			value: value ? value : key ? '' : prev.value,
		})
	);
	// #endregion


	// #region effects
	useEffect(() => {
		let newCategories;

		newCategories = helperAutomaticCategories({
			data: data,
			key: category.key,
			minCount: minRepeat,
		});

		setCategoryOptions(newCategories);
	}, [data, minRepeat, category.key]);
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		filteredData,
		category,
		categoryOptions,
		valueSearched,
		categorySearched,
		handlerCategory,
		handlerValueSearched,
		handlerCategorySearched,
		handlerResetFilters,
	};
	// #endregion
}


export { useFilter };