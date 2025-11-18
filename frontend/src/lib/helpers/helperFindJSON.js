/**
 * The function `helperFindJSON` is designed to find a specific property within an object and return
 * its value, with error handling included.
 * @returns The function `helperFindJSON` returns the value of the specified property from the object
 * if it exists, otherwise it returns `null`.
 */
export const helperFindJSON = ({ object, property }) => {
	try {
		if (Object.prototype.hasOwnProperty.call(object, property)) return object[property];
		return null;

	} catch (error) {
		console.warn(`error al encontrar la propiedad ${property} en el objecto ${object}`);
	}
};
