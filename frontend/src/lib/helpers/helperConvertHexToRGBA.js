/**
 * The function `helperConvertHexToRGBA` converts a hexadecimal color code to its corresponding RGBA
 * format with an optional alpha value.
 * @param hex - The `hex` parameter is a hexadecimal color value that you want to convert to RGBA
 * format.
 * @param [alpha=1] - The `alpha` parameter in the `helperConvertHexToRGBA` function is used to specify
 * the alpha value (opacity) for the RGBA color. It is an optional parameter with a default value of 1,
 * which means the color is fully opaque. You can provide a value between 0 (
 * @returns The helperConvertHexToRGBA function returns a string in the format "rgba(r, g, b, alpha)"
 * where r, g, and b are the red, green, and blue values converted from the input hex color code, and
 * alpha is the optional alpha value (default is 1).
 */
export const helperConvertHexToRGBA = (hex, alpha = 1) => {
	hex = hex.replace(/^#/, '');

	if (hex.length === 3) {
		hex = hex.split('').map(char => char + char).join('');
	};

	const [r, g, b] = hex.match(/.{2}/g).map(val => parseInt(val, 16));

	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};