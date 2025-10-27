/* 
this method allows to the developer make HTTP Request dinamically for almost use cases.
*/
// #region libraries
import axios from 'axios';
import qs from 'qs';
// #endregion


// #region utils
import config from 'config';
import { CONTENT_TYPE_ENUMS } from './methods';
// #endregion


export const EndpointHTTP = async ({
	token,
	method,
	endpoint,
	id,
	query,
	form,
	isJSON = false,
	isQS = false,
	isBlob = false,
	isMultiForm = false,
	isBaseURL = true,
}) => {

	const baseURL = config.baseURL;
	let data = null;
	let entries = null;
	let formattedParams = null;
	let bodyRequest = null;
	let responseType = null;

	// #region configuration
	/* allows you to pass an object and parses to the format to send as a query params */
	if (query) {
		entries = Object.entries(query);
		formattedParams = entries.map(([key, value]) => `${key}=${value}`).join('&');
	}

	/* the body content of the request, selects if the data send as STRING or as JSON */
	// if (form) bodyRequest = isQS ? qs.stringify(form) : isJSON ? JSON.stringify(form) : form;
	if (form) bodyRequest = isQS ? qs.stringify(form) : form;

	/* if you try to download a file, this generates a url blob to easily download the file from outside */
	if (isBlob) responseType = isBlob ? 'blob' : '';
	// #endregion


	// #region main logic
	try {
		/* the final url of the API to make the request */
		const url = `${isBaseURL ? baseURL : ''}${endpoint}${id ? `/${id}` : ''}${formattedParams ? `?${formattedParams}` : ''}`;

		/* content types */
		const contentType = isJSON ? CONTENT_TYPE_ENUMS.JSON : isMultiForm ? CONTENT_TYPE_ENUMS.MULTIPART : CONTENT_TYPE_ENUMS.FORM;

		/* config for  axios */
		const config = {
			method: `${method}`,
			headers: {
				'Content-Type': contentType,
				'Authorization': `${token ? `Bearer ${token}` : ''}`,
			},
			data: bodyRequest,
			responseType: responseType,
		};

		data = await axios(url, config);

	} catch (error) {
		data = error.response;
	} finally {
		return data;
	}
	// #endregion
};