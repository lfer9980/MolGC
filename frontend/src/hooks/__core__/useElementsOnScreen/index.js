'use client';
/*
	hook for handle elements on screen using the hook useObserver
*/

// #region libraries
import { useEffect, useRef, createRef } from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion

// #region utils
// #endregion


// #region reducers & stores
import { useObserver } from 'context';
// #endregion


// #region requests
// #endregion


function useElementsOnScreen({
	rootMargin = '0px',
	threshold = 1,
	count = 1,
	handler,
}) {
	// #region references
	const refs = useRef([]);
	// #endregion


	// #region contexts & hooks
	const { observe, unobserve } = useObserver();
	// #endregion


	// #region variables
	if (refs.current.length !== count) {
		refs.current = Array(count)
			.fill()
			.map((_, i) => refs.current[i] || createRef());
	};
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
	// #endregion


	// #region effects
	useEffect(() => {
		const cleanFns = [];

		refs.current?.forEach(ref => {
			const element = ref.current;
			if (!element) return;

			observe && observe({
				element: element,
				options: { rootMargin, threshold },
				callback: (isVisible) => {
					if (isVisible) {
						handler && handler(element);
					}
				},
			});

			cleanFns.push(() => unobserve && unobserve(element));
		})


		return () => {
			cleanFns.forEach(fn => fn());
		};
	}, [observe, unobserve, handler, rootMargin, threshold]);
	// #endregion


	// #region others
	// #endregion


	// #region main
	return refs.current;
	// #endregion
}


export { useElementsOnScreen };
