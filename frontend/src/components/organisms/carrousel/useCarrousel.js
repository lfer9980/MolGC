'use client';
/* 
	Hook for carrousel: make the carrousel works
*/

// #region libraries
import {
	Children,
	cloneElement,
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
/**
 * this piece of shit code is because React have complainings with Key Props
 * @param {*} children 
 * @param {*} prefix 
 * @returns  mapped children with unique keys
 */
const makeRepeatedWithKeys = (children, prefix) =>
	[0, 1, 2].flatMap(repIndex =>
		children.map((child, i) =>
			cloneElement(child, {
				key: `${prefix}-${repIndex}-${i}`
			})
		)
	);
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
// #endregion


// #region requests
// #endregion

import styles from './styles.module.scss';


function useCarrousel({ elements = { header: [], content: [] } }) {
	// #region references
	const rowUpRef = useRef(null);
	const rowDownRef = useRef(null);

	const rowUpAnimationRef = useRef(null);
	const rowDownAnimationRef = useRef(null);

	const rowUpPositionRef = useRef(0);
	const rowDownPositionRef = useRef(0);
	// #endregion


	// #region contexts & hooks
	// #endregion


	// #region variables
	const SCROLL_SPEED = 0.5;

	const headerChildren = elements.header ? Children.toArray(elements.header.props.children) : [];
	const contentChildren = elements.content ? Children.toArray(elements.content.props.children) : [];

	const ROW_UP = makeRepeatedWithKeys(headerChildren, 'up');
	const ROW_DOWN = makeRepeatedWithKeys(contentChildren, 'down');
	// #endregion


	// #region states
	const [visible, setVisible] = useState(true);
	// #endregion


	// #region memos & callbacks
	const animateRowDownScroll = useCallback(() => {
		if (!rowDownRef.current || !visible) return;

		const container = rowDownRef.current;
		const maxScroll = container.scrollWidth / 3;

		rowDownPositionRef.current += SCROLL_SPEED;

		if (rowDownPositionRef.current >= maxScroll) rowDownPositionRef.current = 0;


		const tracker = container.querySelector(`.${styles.tracker}`);
		if (tracker) tracker.style.transform = `translateX(-${rowDownPositionRef.current}px)`;

		rowDownAnimationRef.current = requestAnimationFrame(animateRowDownScroll);
	}, [visible, SCROLL_SPEED]);


	const animateRowUpScroll = useCallback(() => {
		if (!rowUpRef.current || !visible) return;

		const container = rowUpRef.current;
		const maxScroll = container.scrollWidth / 3;

		if (rowUpPositionRef.current === null) rowUpPositionRef.current = -maxScroll;

		rowUpPositionRef.current += SCROLL_SPEED;

		if (rowUpPositionRef.current >= 0) rowUpPositionRef.current = -maxScroll;

		const tracker = container.querySelector(`.${styles.tracker}`);
		if (tracker) tracker.style.transform = `translateX(${rowUpPositionRef.current}px)`;

		rowUpAnimationRef.current = requestAnimationFrame(animateRowUpScroll);
	}, [visible, SCROLL_SPEED]);
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	// #endregion


	// #region effects
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setVisible(entry.isIntersecting);
			},
			{ threshold: 0.1 }
		);

		const rowDown = rowDownRef.current;
		if (rowDown) observer.observe(rowDown);

		return () => { if (rowDown) observer.unobserve(rowDown) };
	}, []);


	useEffect(() => {
		if (visible) {
			rowDownAnimationRef.current = requestAnimationFrame(animateRowDownScroll);
			rowUpAnimationRef.current = requestAnimationFrame(animateRowUpScroll);
		};

		return () => {
			if (rowDownAnimationRef.current) cancelAnimationFrame(rowDownAnimationRef.current);
			if (rowUpAnimationRef.current) cancelAnimationFrame(rowUpAnimationRef.current);
		};
	}, [visible, animateRowDownScroll, animateRowUpScroll]);

	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		ROW_UP,
		ROW_DOWN,
		rowDownRef,
		rowUpRef,
	};
	// #endregion
}


export { useCarrousel };