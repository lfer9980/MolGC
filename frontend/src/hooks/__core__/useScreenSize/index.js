'use client';
/* 
	Hook for listen Screen size change:
	if the size of screen changes, execute something with this hook
*/

// #region libraries
import {
	useCallback,
	useEffect,
	useRef,
	useState
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


// #region contexts & stores
// #endregion


// #region requests
// #endregion


function useScreenSize({
	screen = [],
	threshold = 50,
	handler
}) {
	// #region references
	const lastWidthRef = useRef(window.innerWidth);
	const prevScreenRef = useRef(null);
	// #endregion


	// #region contexts & hooks
	// #endregion


	// #region variables
	const SIZE_TABLET = 501;
	const SIZE_DESKTOP = 1023;
	const SIZE_LARGE = 1441;
	// #endregion


	// #region states
	const [screenMatch, setScreenMatch] = useState(null);
	// #endregion


	// #region memos & callbacks
	const callbackBreakpoint = useCallback((width) => {
		let actualScreen;

		if (width < SIZE_TABLET) actualScreen = 'mobile';
		else if (width < SIZE_DESKTOP) actualScreen = 'tablet';
		else if (width < SIZE_LARGE) actualScreen = 'desktop';
		else actualScreen = 'large';

		if (actualScreen !== prevScreenRef.current) {
			prevScreenRef.current = actualScreen;

			if (screen.includes(actualScreen)) {
				setScreenMatch(true);
				handler && handler();

			} else {
				setScreenMatch(false);
			};
		};
	}, [screen, handler, setScreenMatch]);
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	// #endregion


	// #region effects
	useEffect(() => {
		const handleResize = () => {
			const newWidth = window.innerWidth;
			const diff = Math.abs(newWidth - lastWidthRef.current);

			if (diff < threshold) return;
			lastWidthRef.current = newWidth;

			callbackBreakpoint(newWidth);
		};

		callbackBreakpoint(lastWidthRef.current);

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [threshold, callbackBreakpoint]);
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		screenMatch,
	};
	// #endregion
}


export { useScreenSize };