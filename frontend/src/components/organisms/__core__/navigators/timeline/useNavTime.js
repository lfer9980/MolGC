'use client';
/* 
	handles logic for timeline navigator scrolling
*/
// #region libraries
import { useRef, useState } from 'react';
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

export const SCROLL_DIR = {
	UP: 'up',
	DOWN: 'down',
	LEFT: 'left',
	RIGHT: 'right',
}


function useNavTime({
	value = { year: '', month: '' },
	handler,
}) {
	// #region references
	const scrollYears = useRef(null);
	const scrollMonths = useRef(null);

	// #endregion


	// #region contexts & hooks
	// #endregion


	// #region variables
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region states
	const [inValue, setInValue] = useState(value);
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerSetNav = ({ element, type }) => {
		/* handle to control what happens when user clicks a date */
		let newValue = { ...inValue, [type]: element };

		setInValue(newValue);
		handler && handler(newValue);
	};

	const handlerScroll = ({ direction, scroller }) => {
		/* Handles scroll on all directions */
		if (scroller.current) {
			const { current } = scroller;

			switch (direction) {
				case SCROLL_DIR.UP:
					return current.scrollBy({ top: -250, behavior: 'smooth' });;

				case SCROLL_DIR.DOWN:
					return current.scrollBy({ top: 250, behavior: 'smooth' });

				case SCROLL_DIR.LEFT:
					return current.scrollBy({ left: -200, behavior: 'smooth' });

				case SCROLL_DIR.RIGHT:
					return current.scrollBy({ left: 200, behavior: 'smooth' });

				default:
					break;
			};
		};
	};
	// #endregion


	// #region effects
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		scrollYears,
		scrollMonths,
		inValue,
		handlerSetNav,
		handlerScroll
	};
	// #endregion
}


export { useNavTime };