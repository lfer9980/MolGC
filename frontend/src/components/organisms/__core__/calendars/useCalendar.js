'use client';
/*
	Handles logic for calendar events
*/
// #region libraries
import { useEffect, useState } from 'react';
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


function useCalendar({ view = 'week' }) {
	// #region references
	// #endregion


	// #region contexts & hooks
	// #endregion


	// #region variables
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region states
	const [events, setEvents] = useState([]);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [currentView, setCurrentView] = useState(view);

	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerView = (view) => setCurrentView(view);
	const handlerDate = (date) => setCurrentDate(date);
	// #endregion


	// #region effects
	useEffect(() => {
		setEvents([
			{
				title: 'Evento de ejemplo',
				start: new Date(),
				end: new Date(new Date().getTime() + 60 * 60 * 1000),
			},
		]);
	}, []);
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		events,
		currentDate,
		currentView,
		handlerView,
		handlerDate,
	};
	// #endregion
}


export { useCalendar };
