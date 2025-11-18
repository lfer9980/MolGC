/**
 * The `splitString` function splits a string by a specified delimiter and returns an array of trimmed
 * substrings.
 * @param [value] - The `value` parameter is the string that you want to split into an array based on a
 * specified delimiter. If no value is provided, an empty string will be used as the default.
 * @param [split= ] - The `split` parameter in the `splitString` function is used to specify the
 * character or substring at which the input string should be split. By default, if no value is
 * provided for `split`, the function will split the input string at spaces (' ').
 * @returns The `splitString` function is returning an array of strings after splitting the input
 * `value` using the specified `split` delimiter and trimming each item in the resulting array.
 */
export const splitString = (value = '', split = ' ') => {
	return value.split(split).map(item => item.trim());
};
