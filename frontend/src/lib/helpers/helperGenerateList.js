/**
 * The function `helperGenerateList` generates a list of numbers from 1 to the specified quantity.
 * @param quantity - The `quantity` parameter in the `helperGenerateList` function represents the
 * number of elements you want to generate in the list.
 * @returns The `helperGenerateList` function returns an array containing numbers from 1 to the
 * specified `quantity`.
 */
export const helperGenerateList = (quantity) => {
	return Array.from({ length: quantity }, (_, i) => i + 1);
};
