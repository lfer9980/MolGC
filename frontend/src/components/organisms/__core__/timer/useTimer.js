'use client';
/* 
	handles timerX logic
*/
// #region libraries
import { useMemo, useState } from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion

// #region utils
// #endregion


// #region reducers & stores
import { useTimerDownStore } from 'store/__core__/timer/down';
import { useTimerUpStore } from 'store/__core__/timer/up';
// #endregion


// #region requests
// #endregion


function useTimer({ mode = '' }) {
	// #region references
	// #endregion


	// #region contexts & hooks
	const timerDownStore = useTimerDownStore();
	const timerUpStore = useTimerUpStore();
	// #endregion


	// #region variables
	// #endregion


	// #region memos & callbacks
	const store = useMemo(() => {
		return mode === 'countdown' ? timerDownStore : timerUpStore;
	}, [mode, timerDownStore, timerUpStore]);
	// #endregion


	// #region states
	const [open, setOpen] = useState(false);
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerOpen = () => setOpen(prev => !prev);

	const handlerFormat = (ms) => {
		/* function to format ms value to timer format */
		const absMs = Math.abs(ms);
		const totalSeconds = Math.floor(absMs / 1000);

		/* adds a zero to one digit numbers */
		const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
		const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
		const seconds = String(totalSeconds % 60).padStart(2, '0');

		return `${hours}:${minutes}:${seconds}`;
	};

	// #endregion


	// #region effects
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		...store,
		open,
		handlerOpen,
		handlerFormat,
	}
	// #endregion
}


export { useTimer };