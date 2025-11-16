'use client';
/* 
`Hook for transitioning from welcome to start analysis view: 
*/

// #region libraries
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
// #endregion


// #region components
// #endregion


// #region assets
// #endregion

// #region utils
import { JOB_STATUS_ENUM } from "lib/enums";
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
import { useJobStore } from "store/job";
// #endregion


// #region requests
import { useServiceJob } from 'services/job';
import { useServiceUpload } from "services/upload";
import { useNotificationStore } from "store/__core__/notifications";
// #endregion


function useWelcome({ }) {
	// #region references
	// #endregion


	// #region contexts & hooks
	const {
		job,
	} = useJobStore({});

	const {
		loading,
		handlerCreateJob,
		handlerValidateJob,
	} = useServiceJob({});

	const {
		handlerUploadAutomatic,
	} = useServiceUpload({});

	const {
		handlerAddMessage,
	} = useNotificationStore();
	// #endregion


	// #region variables
	const router = useRouter();
	// #endregion


	// #region states
	const [view, setView] = useState(0);
	const [isDemo, setIsDemo] = useState(false);
	const [validate, setValidate] = useState(false);
	const [progress, setProgress] = useState({ progress: 0, event: null, type: '' });
	// #endregion


	// #region memos & callbacks
	const validateJobCallback = useCallback(async () => {
		if (job?.status === JOB_STATUS_ENUM.COMPLETED) {
			const isValid = await handlerValidateJob();
			return setValidate(isValid);
		};

		setValidate(false);
	}, []);
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const _handlerProgress = (newProgress) => setProgress(newProgress);

	const handlerStartDemo = async () => {
		try {
			const newToken = await handlerCreateJob({
				uploadType: "automatic",
				redirect: false,
			});

			if (!newToken) {
				return handlerAddMessage({
					content: {
						icon: 'error',
						title: 'No se pudo crear la sesión',
						text: 'Porfavor intenta nuevamente'
					},
					type: MESSAGE_ENUM.ALERT,
				});
			};

			const response = await fetch('/api/internal/file');

			if (!response.ok) {
				return handlerAddMessage({
					content: {
						icon: 'error',
						title: 'Ocurrio un error al enviar los archivos...',
						text: `${response.statusText}`
					},
					type: MESSAGE_ENUM.ALERT,
				});
			};

			setIsDemo(true);

			const blob = await response.blob();
			const file = new File(
				[blob],
				"molecules.zip",
				{
					type: "application/zip",
					lastModified: Date.now()
				}
			);

			await handlerUploadAutomatic({
				files: [file],
				handlerProgress: _handlerProgress,
				explicitToken: newToken,
			});

		} catch (e) {
			console.error('Error al iniciar el demo:', e);
		};
	};
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


	useEffect(() => {
		validateJobCallback();
	}, [validateJobCallback]);
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		router,
		view,
		isDemo,
		validate,
		loading,
		progress,
		handlerCreateJob,
		handlerStartDemo,
	};
	// #endregion
}


export { useWelcome };