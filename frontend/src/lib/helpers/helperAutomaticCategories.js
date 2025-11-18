/**
 * The `helperAutomaticCategories` function extracts categories from an array of objects based on a
 * specified key and minimum count.
 * @param [data] - The `data` parameter is an array of objects that you want to analyze for automatic
 * categories. Each object in the array should have a property specified by the `key` parameter, which
 * will be used to categorize the data. The `minCount` parameter specifies the minimum number of
 * occurrences a category
 * @param key - The `key` parameter is the property key that you want to use for categorization. It is
 * the key in each object of the `data` array that you want to analyze for automatic categorization
 * based on the minimum count specified.
 * @param [minCount=2] - The `minCount` parameter in the `helperAutomaticCategories` function
 * represents the minimum number of occurrences a category must have in the data in order to be
 * included in the result. Categories that have a count equal to or greater than `minCount` will be
 * returned by the function.
 * @returns An array of values that occur at least `minCount` times in the `data` array under the
 * specified `key`.
 */
export const helperAutomaticCategories = ({ data = [], key, minCount = 2 }) => {
	if (!key || !Array.isArray(data)) return [];

	const countMap = new Map();

	data.forEach(item => {
		const value = item[key];
		if (value != null) countMap.set(value, (countMap.get(value) || 0) + 1);
	});

	return [...countMap.entries()]
		.filter(([_, count]) => count >= minCount)
		.map(([value]) => value);
};
