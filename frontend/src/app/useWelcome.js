'use client';
/* 
Hook for transitioning from welcome to start analysis view: 
*/

// #region libraries
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
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


function useWelcome({ }) {
	// #region references
	const touchStartY = useRef(0);
	// #endregion


	// #region contexts & hooks
	// #endregion


	// #region variables
	const router = useRouter();
	// #endregion


	// #region states
	const [view, setView] = useState(0);
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerRedirect = (href) => {
		router.push(href);
	};
	// #endregion


	// #region effects
	useEffect(() => {
		let touchStartY = 0;
		let touchStartX = 0;

		const handleTouchStart = (e) => {
			touchStartY = e.touches[0].clientY;
			touchStartX = e.touches[0].clientX;
		};

		const handleTouchEnd = (e) => {
			const touchEndY = e.changedTouches[0].clientY;
			const touchEndX = e.changedTouches[0].clientX;

			const deltaY = touchEndY - touchStartY;
			const deltaX = touchEndX - touchStartX;

			if (Math.abs(deltaX) > Math.abs(deltaY)) return;

			if (deltaY < -50) setView(1);
			else if (deltaY > 50) setView(0);
		};

		window.addEventListener("touchstart", handleTouchStart, { passive: true });
		window.addEventListener("touchend", handleTouchEnd);

		return () => {
			window.removeEventListener("touchstart", handleTouchStart);
			window.removeEventListener("touchend", handleTouchEnd);
		};
	}, []);
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		view,
		handlerRedirect,
	};
	// #endregion
}


export { useWelcome };