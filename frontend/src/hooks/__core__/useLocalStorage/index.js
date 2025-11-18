'use client';
/*
	handles all logic for localStorage Managment
	NOTE: Use this hook only in client side and for storage complex data from store
*/

// #region libraries
import { useCallback, useEffect, useState } from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion

// #region utils
// #endregion


// #region reducers & stores
// #endregion


// #region requests
// #endregion


function useLocalStorage({
	initial = {},
	name = 'default',
	handler
}) {
	// #region references
	// #endregion


	// #region contexts & hooks
	// #endregion


	// #region variables
	// #endregion


	// #region states
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const getLocalStorage = useCallback(({ name = '' }) => {
		/* to set a new value on localStorage Item */
		try {
			if (typeof window !== 'undefined' && name) {
				setLoading(true);
				const localStorageItem = localStorage.getItem(name);
				let parsedItem = JSON.parse(localStorageItem);

				if (parsedItem) return parsedItem;
				return null;
			};
		} catch (error) {
			setError(true);
			console.warn(`ocurrio un error al intentar obtener informacion desde localStorage: ${name}, error:${error}`);

		} finally {
			setLoading(false);
		};
	}, []);


	const setLocalStorage = useCallback(({ name = '', data }) => {
		/* to set a new value on localStorage Item */
		try {
			if (typeof window !== 'undefined' && data && name) {
				setLoading(true);
				const localStorageItem = localStorage.getItem(name);
				let parsedItem = JSON.parse(localStorageItem);

				if (parsedItem) {
					parsedItem = {
						...parsedItem,
						...data,
					};

					localStorage.setItem(name, JSON.stringify(parsedItem));
					return parsedItem;
				};

				return null;
			};
		} catch (error) {
			setError(true);
			console.warn(`ocurrio un error al intentar setear en localStorage: ${name}, error:${error}`);

		} finally {
			setLoading(false);
		};
	}, []);


	const deleteLocalStorage = useCallback(({ name = '' }) => {
		/* to set a new value on localStorage Item */
		try {
			if (typeof window !== 'undefined' && name) {
				setLoading(true);
				localStorage.setItem(name, JSON.stringify(initial));
			};
		} catch (error) {
			setError(true);
			console.warn(`ocurrio un error al intentar obtener informacion desde localStorage: ${name}, error:${error}`);

		} finally {
			setLoading(false);
		};
	}, [initial]);
	// #endregion


	// #region effects
	useEffect(() => {
		/* this executes the first load on localStorage, if not exists, creates one with specified name */
		try {
			if (typeof window != 'undefined') {
				let parsedItem;

				setLoading(true);
				const localStorageItem = localStorage.getItem(name);

				if (!localStorageItem && name) {
					parsedItem = { ...initial };
					localStorage.setItem(name, JSON.stringify(parsedItem));

				} else parsedItem = JSON.parse(localStorageItem);

				return handler && handler(parsedItem);
			}
		}
		catch (error) {
			setError(true);
			console.warn(`ocurrio un error al intentar cargar desde localStorage: ${name}, error:${error}`);

		} finally {
			setLoading(false);
		};

	}, [handler, initial, name]);

	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		error,
		loading,
		getLocalStorage,
		setLocalStorage,
		deleteLocalStorage,
	};
	// #endregion
}


export { useLocalStorage };
