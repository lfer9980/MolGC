/**
 * The helperFormatDate function formats a given date into a string in the format 'YYYY-MM-DD'.
 * @param date - The `date` parameter in the `helperFormatDate` function is a JavaScript Date object
 * representing a specific date and time.
 * @returns The helperFormatDate function returns a formatted date string in the format 'YYYY-MM-DD'.
 */
export const helperFormatDate = (date) => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
};