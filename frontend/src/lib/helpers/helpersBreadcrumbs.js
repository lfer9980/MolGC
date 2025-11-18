import { ROUTE_NAMES } from 'lib/__core__/routes';

/**
 * The `splitPath` function splits a route path by '/' and filters out any empty elements.
 * @param route - The `route` parameter is typically an object that represents the current route in a
 * web application. It may contain information such as the path of the route, query parameters, and
 * other relevant data. In this case, the `route` object seems to have a property called `asPath`,
 * which is
 */
export const splitPath = (route = '') => route.split('/').filter((x) => x);


/**
 * The function `assignPathName` takes an array of path names and a map of route names, and returns an
 * array of corresponding route names or original path names if no match is found.
 */
export const assignPathName = (pathName = []) => pathName.map(key => ROUTE_NAMES[key] || key);


/**
 * This function splits a route path and returns the first position.
 * @param route - Route is a string that represents a URL path.
 */
export const splitPathFirstPos = (route = '') => {
	const splitted = splitPath(route);

	if (splitted.length > 1) return splitted[0];
	return '/';
};
