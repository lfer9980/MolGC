import { colorsApp } from 'lib/utils';


/**
 * The function `helperRandomColor` generates a specified number of random colors from a given set of
 * allowed colors.
 * @param count - The `count` parameter specifies the number of random colors you want to generate.
 * @param [allowed] - The `allowed` parameter in the `helperRandomColor` function is an optional
 * parameter that allows you to specify an array of color keys that you want to include in the random
 * color selection. If you provide an array of color keys as the `allowed` parameter, the function will
 * only select random colors
 * @returns The function `helperRandomColor` returns an array of randomly selected colors from the
 * `colorsApp` object based on the specified count and allowed colors. If no allowed colors are
 * specified, it will use all colors from the `colorsApp` object.
 */
export function helperRandomColor({ count, allowed = [] }) {
	const keys = allowed || Object.keys(colorsApp);

	const availableColors = keys
		.map(key => colorsApp[key])
		.filter(Boolean);

	if (availableColors.length === 0) return [];

	const result = [];

	for (let i = 0; i < count; i++) {
		const randomIndex = Math.floor(Math.random() * availableColors.length);
		result.push(availableColors[randomIndex]);
	}

	return result;
};