'use client';
/* 
	an example of how store needs to be implemented
*/

// #region libraries
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState
} from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
import { EndpointHTTP } from 'lib/requests/http';
import { HTTP_METHODS_ENUMS } from 'lib/requests/http/methods';
// #endregion


// #region hooks 
// #endregion


const ExampleStoreContext = createContext();

export function ExampleStoreProvider({ children }) {
	// #region contexts
	// #endregion


	// #region references
	// #endregion


	// #region variables
	const API_EXAMPLE = 'https://pokeapi.co/api/v2/pokemon';
	// #endregion


	// #region states
	const [data, setData] = useState([]);
	const [endReached, setEndReached] = useState(false);
	const [loading, setLoading] = useState(false);
	const [params, setParams] = useState({ limit: 10, offset: 0 });
	const [fault, setFault] = useState(false);
	// #endregion


	// #region memos & callbacks
	const fetchData = useCallback(async (currentParams) => {
		if (loading || endReached) return;

		setLoading(true);

		const response = await EndpointHTTP({
			method: HTTP_METHODS_ENUMS.GET,
			endpoint: API_EXAMPLE,
			query: currentParams,
			isBaseURL: false,
		});

		if (response?.status === 200) {
			const newData = response.data?.results || [];

			setData(prev => [...prev, ...newData]);
			setParams(prev => ({ ...prev, offset: prev.offset + prev.limit }));

			if (newData.length < currentParams.limit) setEndReached(true);
		}
		else {
			setFault(true);
		};

		setLoading(false);
	}, [loading, endReached]);
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerLoadMore = () => {
		if (data.length <= 0 || data.length >= 50) return;
		fetchData(params);
	};


	const handlerFault = () => {
		setFault(prev => !prev);
	};
	// #endregion


	// #region effects
	useEffect(() => {
		fetchData(params);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// #endregion


	// #region others
	// #endregion


	// #region main
	return (
		<ExampleStoreContext.Provider
			value={{
				data,
				loading,
				endReached,
				fault,
				handlerFault,
				handlerLoadMore,
			}}
		>
			{children}
		</ExampleStoreContext.Provider>
	);
	// #endregion
}

// #region useHook
export function useExampleStore() {
	const context = useContext(ExampleStoreContext);

	if (!context) {
		return {
			data: [],
			loading: false,
			endReached: false,
			fault: false,
			handlerLoadMore: () => console.warn('handlerLoadMore llamado sin contexto'),
		};
	}

	return context;
};
// #endregion