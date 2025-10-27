'use client';
/* 
	Handles logic for magnifier component
*/

// #region libraries
import { useEffect, useRef, useState } from 'react';
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


function useMagnifier({ image = '' }) {
	// #region references
	const imgRef = useRef(null);
	const inImage = image ? image : '/images/logotipo.png';
	// #endregion


	// #region contexts & hooks
	// #endregion


	// #region variables
	// #endregion


	// #region memos & callbacks

	// #endregion


	// #region states
	/* controls the magnifier pos*/
	const [[xAxis, yAxis], setXY] = useState([0, 0]);
	/* controls width and height */
	const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
	/* controls if magnifier is showing or not */
	const [show, setShow] = useState(false);

	/* piece of shit code because nextImage work nasty */
	const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerMouseLeave = () => setShow(false);

	const handlerMouseEnter = () => {
		/* update image size and turn on magnifier */
		const item = imgRef.current.firstChild;
		const { width, height } = item.getBoundingClientRect();

		setSize([width, height]);
		setShow(true);
	}

	const handlerMouseMove = (event) => {
		/* update cursor position */
		const item = imgRef.current.firstChild;
		const { top, left } = item.getBoundingClientRect();

		/* calculate cursor position on the image */
		const x = event.pageX - left - window.scrollX;
		const y = event.pageY - top - window.scrollY;

		setXY([x, y]);
	}
	// #endregion


	// #region effects
	useEffect(() => {
		const img = new Image();
		img.src = image;
		img.onload = () => {
			setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
		};
	}, [image]);
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		inImage,
		imageSize,
		imgRef,
		xAxis,
		yAxis,
		imgWidth,
		imgHeight,
		show,
		handlerMouseEnter,
		handlerMouseMove,
		handlerMouseLeave
	};
	// #endregion
}


export { useMagnifier };