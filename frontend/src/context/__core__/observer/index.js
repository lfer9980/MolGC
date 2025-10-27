'use client';
/* 
	centralize intersection observer logic for uses as a service
*/

// #region libraries
import {
	createContext,
	useCallback,
	useContext,
	useRef,
} from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks 
// #endregion


const ObserverContext = createContext({});

export function ObserverProvider({ children }) {
	// #region contexts
	// #endregion


	// #region references
	const observersRef = useRef(new Map());
	const elementsMapRef = useRef(new WeakMap());
	// #endregion


	// #region variables
	// #endregion


	// #region states
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const _getObserverKey = useCallback(({ rootMargin, threshold }) => (
		/* returns a mapped rootMargin & threshold string */
		`${rootMargin || '0px'}|${Array.isArray(threshold) ? threshold.join(',') : threshold}`
	), []);


	const _getOrCreateObserver = useCallback(({ rootMargin, threshold }) => {
		const key = _getObserverKey({ rootMargin, threshold });

		if (!observersRef.current.has(key)) {
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						const data = elementsMapRef.current.get(entry.target);

						if (data?.callback) {
							data.callback(entry.isIntersecting, entry);
						}
					});
				},
				{ rootMargin, threshold }
			);

			observersRef.current.set(key, observer);
		};

		return observersRef.current.get(key);
	}, [_getObserverKey]);


	const observe = useCallback(({ element, callback, options = {} }) => {
		const { rootMargin = '0px', threshold = 0.1 } = options;

		if (!element || typeof callback !== 'function') return;

		const observer = _getOrCreateObserver({ rootMargin, threshold });

		observer.observe(element);

		elementsMapRef.current.set(element, {
			observerKey: _getObserverKey(rootMargin, threshold),
			callback,
		});
	}, [_getOrCreateObserver, _getObserverKey]);


	const unobserve = useCallback(({ element }) => {
		const data = elementsMapRef.current.get(element);

		if (data) {
			const observer = observersRef.current.get(data.observerKey);
			observer?.unobserve(element);

			observersRef.current.delete(element);
		};
	}, []);


	const resetObservers = useCallback(() => {
		observersRef.current.forEach((item) => {
			item.disconnect();
		});

		observersRef.current.clear();
		elementsMapRef.current = new WeakMap();
	}, []);
	// #endregion


	// #region effects
	// #endregion


	// #region others
	// #endregion


	// #region main
	return (
		<ObserverContext.Provider
			value={{
				observe,
				unobserve,
				resetObservers
			}}
		>
			{children}
		</ObserverContext.Provider>
	);
	// #endregion
};

// #region useHook
export function useObserver() {
	const context = useContext(ObserverContext);

	if (!context) {
		return {
			observe: () => console.warn('observe llamado sin contexto'),
			unobserve: () => console.warn('unobserve llamado sin contexto'),
			resetObservers: () => console.warn('resetObserversllamado sin contexto'),
		};
	};

	return context;
};
// #endregion