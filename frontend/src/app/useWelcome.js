'use client';
/* 
`Hook for transitioning from welcome to start analysis view: 
*/

// #region libraries
import { useState, useEffect } from "react";
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
	// #endregion


	// #region contexts & hooks
	// #endregion


	// #region variables
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
	// #endregion


	// #region effects
	useEffect(() => {
		let touchStartY = 0;
		let touchStartX = 0;
		let isSwiping = false;
		let accumulatedDelta = 0;
		let lastDirection = 0;
		let ticking = false;

		const handleTouchStart = (e) => {
			touchStartY = e.touches[0].clientY;
			touchStartX = e.touches[0].clientX;
			isSwiping = true;
		};

		const handleTouchMove = (e) => {
			if (!isSwiping) return;
			const currentY = e.touches[0].clientY;
			const deltaY = currentY - touchStartY;

			if (window.scrollY === 0 && deltaY > 0) {
				e.preventDefault();
			}
		};

		const handleTouchEnd = (e) => {
			isSwiping = false;
			const touchEndY = e.changedTouches[0].clientY;
			const touchEndX = e.changedTouches[0].clientX;

			const deltaY = touchEndY - touchStartY;
			const deltaX = touchEndX - touchStartX;

			if (Math.abs(deltaX) > Math.abs(deltaY)) return;

			if (deltaY < -50) setView(1);
			else if (deltaY > 50) setView(0);
		};

		const handleWheel = (e) => {
			const direction = Math.sign(e.deltaY);
			accumulatedDelta += e.deltaY;

			if (direction !== lastDirection) {
				accumulatedDelta = e.deltaY;
				lastDirection = direction;
			}

			if (!ticking) {
				window.requestAnimationFrame(() => {
					if (accumulatedDelta > 50) {
						setView(1);
						accumulatedDelta = 0;
					} else if (accumulatedDelta < -50) {
						setView(0);
						accumulatedDelta = 0;
					}
					ticking = false;
				});
				ticking = true;
			}
		};

		window.addEventListener("touchstart", handleTouchStart, { passive: false });
		window.addEventListener("touchmove", handleTouchMove, { passive: false });
		window.addEventListener("touchend", handleTouchEnd);
		window.addEventListener("wheel", handleWheel, { passive: true });

		return () => {
			window.removeEventListener("touchstart", handleTouchStart);
			window.removeEventListener("touchmove", handleTouchMove);
			window.removeEventListener("touchend", handleTouchEnd);
			window.removeEventListener("wheel", handleWheel);
		};
	}, [setView]);
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		view,
	};
	// #endregion
}


export { useWelcome };