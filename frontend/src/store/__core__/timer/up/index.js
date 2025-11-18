'use client';
/*
	STORE para preservar el valor del contador con localStorage.
	Maneja toda la logica para los contadores de cuenta ascendente.
*/

// #region libraries
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
import { EndpointHTTP } from 'lib/requests/http';
import { STYLE_LOG_ENUM } from 'lib/helpers';
import { HTTP_METHODS_ENUMS } from 'lib/requests/http/methods';
// #endregion


// #region hooks
// #endregion


// #region store & reducers
import { useNotificationStore } from 'store/__core__/notifications';
// #endregion


const TimerUpStoreContext = createContext();


export function TimerUpStoreProvider({
	name = 'default',
	endpoint = '',
	defaultValue = 30,
	refresh = 5,
	children
}) {
	// #region contexts
	const {
		handlerAddMessage,
	} = useNotificationStore();
	// #endregion


	// #region references
	const animationRef = useRef(null);
	// #endregion


	// #region variables
	const DEFAULT_DURATION = defaultValue * 60 * 1000;

	const notificationError = useMemo(() => ({
		log: STYLE_LOG_ENUM.WARNING,
		title: 'Error al incializar el contador',
		label: `tuvimos problemas para inicializar el contador ${name}`,
		labelButton: 'entendido',
		arrowButton: false,
	}), [name]);
	// #endregion


	// #region states
	const [time, setTime] = useState(0);
	const [timeSpan, setTimeSpan] = useState(0);
	const [timeStart, setTimeStart] = useState(null);
	const [deadline, setDeadline] = useState(null);

	/* controls */
	const [paused, setPaused] = useState(false);
	const [stopped, setStopped] = useState(false);
	const [edit, setEdit] = useState(false);
	const [pausedAt, setPausedAt] = useState(null);

	/* loading */
	const [loading, setLoading] = useState(true);
	const [fetching, setFetching] = useState(false);
	// #endregion


	// #region memos & callbacks
	const handlerFetchTimer = useCallback(async () => {
		/*  handles timer fetching from API */
		try {
			let newDeadline;

			setFetching(true);

			if (endpoint) {
				const response = await EndpointHTTP({
					method: HTTP_METHODS_ENUMS.GET,
					endpoint: endpoint,
				});

				if (response?.status === 200) {
					const span = response.data?.deadline;

					setTimeSpan(span);
					newDeadline = Date.now() + span;

				} else {
					newDeadline = 0;
					setEdit(true);
					setTimeSpan(0);
					handlerAddMessage({ content: notificationError });
				};

			} else {
				newDeadline = Date.now() + DEFAULT_DURATION;
				setTimeSpan(DEFAULT_DURATION);
			}

			const newTimeStart = Date.now();

			setDeadline(newDeadline);
			setTimeStart(Date.now());

			localStorage.setItem(`${name}_countUpDeadline`, newDeadline);
			localStorage.setItem(`${name}_countUpTimeStart`, newTimeStart);
		}
		catch (e) {
			console.error('error en peticion del deadline:', e);
		}
		finally {
			setFetching(false);
		};
	}, [DEFAULT_DURATION, endpoint, handlerAddMessage, name, notificationError]);


	const callbackDeadline = useCallback(async () => {
		/* this intial callback request interval timer from local storage or API */
		setLoading(true);
		const StoredDeadline = Number(localStorage.getItem(`${name}_countUpDeadline`));
		const StoredTimeStart = Number(localStorage.getItem(`${name}_countUpTimeStart`));

		if (StoredDeadline) {
			setDeadline(StoredDeadline);
			setTimeStart(StoredTimeStart);
			setTime(Date.now() - StoredTimeStart);

			setLoading(false);
			return;
		};

		await handlerFetchTimer();
		setLoading(false);
	}, [handlerFetchTimer, name]);
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const _handlerUpdateTime = useCallback(() => {
		/* update timer on every tick */
		let newTime = Date.now();

		if (newTime <= deadline + 1000)
			setTime(newTime - timeStart);
	}, [deadline, timeStart]);


	/* CONTROLS */
	const handlerPause = () => {
		/* to pause timer, saves the date when the timer was paused and add to deadline */
		setPaused(true);
		setPausedAt(Date.now());
		cancelAnimationFrame(animationRef.current);
	};

	const handlerPlay = async () => {
		/* to play again timer, adds the paused time and refresh deadline & start date */
		if (paused) {
			const pausedDuration = Date.now() - pausedAt;
			const actualDeadline = Number(localStorage.getItem(`${name}_countUpDeadline`));
			const actualTimeStart = Number(localStorage.getItem(`${name}_countUpTimeStart`));

			if (actualDeadline && actualTimeStart) {
				const newDeadline = actualDeadline + pausedDuration;
				const newTimeStart = actualTimeStart + pausedDuration;

				localStorage.setItem(`${name}_countUpDeadline`, newDeadline);
				localStorage.setItem(`${name}_countUpTimeStart`, newTimeStart);

				setDeadline(newDeadline);
				setTimeStart(newTimeStart);
				setPaused(false);
				return;
			}
		};

		if (stopped) {
			await handlerFetchTimer();
			setStopped(false);
			return;
		};
	};

	const handlerStop = () => {
		/* resets timer to zero */
		setDeadline(null);
		setTimeStart(null);
		setTime(0);
		setPaused(false);
		setStopped(true);

		localStorage.removeItem(`${name}_countUpDeadline`);
		localStorage.removeItem(`${name}_countUpTimeStart`);
		cancelAnimationFrame(animationRef.current);
	};

	const handlerReset = (time = 30) => {
		/* to set new date manually */
		const newTime = time * 60 * 1000;
		const actualTime = Date.now();
		const newDeadline = actualTime + newTime;

		setDeadline(newDeadline);
		setTimeStart(actualTime);
		setTimeSpan(newTime);
		edit && setEdit(false);

		localStorage.setItem(`${name}_countUpDeadline`, newDeadline);
		localStorage.setItem(`${name}_countUpTimeStart`, actualTime);
	};
	// #endregion


	// #region effects
	useEffect(() => {
		/* handles initial fetching */
		callbackDeadline();
	}, [callbackDeadline]);


	useEffect(() => {
		/* handles new time refresh ticking */
		if (!deadline) return;
		if (paused || stopped) return;

		const tick = () => {
			_handlerUpdateTime();
			animationRef.current = requestAnimationFrame(tick);
		};

		tick();
		return () => cancelAnimationFrame(animationRef);
	}, [_handlerUpdateTime, deadline, paused, stopped]);


	useEffect(() => {
		/* sincronize between tabs */
		const syncTimer = () => {
			const rawDeadline = localStorage.getItem(`${name}_countUpDeadline`);
			const rawTimeStart = localStorage.getItem(`${name}_countUpTimeStart`);

			if (rawDeadline !== null && rawTimeStart !== null) {
				const storedDeadline = Number(rawDeadline);
				const storedTimeStart = Number(rawTimeStart);

				setDeadline(storedDeadline);
				setTimeStart(storedTimeStart);
				localStorage.setItem(`${name}_countUpDeadline`, deadline);
				localStorage.setItem(`${name}_countUpTimeStart`, storedTimeStart);
			}
		};

		window.addEventListener('storage', syncTimer);
		return () => window.removeEventListener('storage', syncTimer);
	}, [deadline, name]);


	useEffect(() => {
		/* new request every x time */
		const interval = setInterval(() => {
			if (paused || stopped) return;
			handlerFetchTimer();
		}, refresh * 60 * 1000);

		return () => clearInterval(interval);
	}, [handlerFetchTimer, paused, refresh, stopped]);
	// #endregion


	// #region others
	// #endregion


	// #region main
	return (
		<TimerUpStoreContext.Provider
			value={{
				time,
				timeSpan,
				paused,
				stopped,
				loading,
				edit,
				fetching,
				handlerPause,
				handlerPlay,
				handlerStop,
				handlerReset,
			}}
		>
			{children}
		</TimerUpStoreContext.Provider>
	);
	// #endregion
}

// #region useHook
export function useTimerUpStore() {
	const context = useContext(TimerUpStoreContext);

	if (!context) {
		return {
			time: null,
			timeSpan: 0,
			paused: false,
			stopped: false,
			loading: false,
			edit: false,
			fetching: false,
			handlerPause: () => console.warn('handlerPause llamado sin contexto'),
			handlerPlay: () => console.warn('handlerPlay llamado sin contexto'),
			handlerStop: () => console.warn('handlerStop llamado sin contexto'),
			handlerReset: () => console.warn('handlerReset llamado sin contexto'),
		};
	};

	return context;
};
// #endregion
