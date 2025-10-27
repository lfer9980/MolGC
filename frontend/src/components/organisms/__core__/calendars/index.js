'use client';
/* 
	MOLECULES - CALENDAR X
*/
// #region libraries
import {
	format,
	parse,
	startOfWeek,
	getDay
} from 'date-fns';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
import { useCalendar } from './useCalendar';
// #endregion


// #region context & stores
import { useLocale } from 'context/__core__';
// #endregion


// #region styles
import styles from './styles.module.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useThemeStore } from 'context/__core__';
// #endregion



function CalendarX({
	view = 'day',
	theme = ''
}) {
	// #region hooks & others
	const {
		t,
		locale,
		dateLocale
	} = useLocale({});


	const {
		events,
		currentDate,
		currentView,
		handlerView,
		handlerDate,
	} = useCalendar({
		view: view,
	});


	const localizer = dateFnsLocalizer({
		format,
		parse,
		/* begin o week according of language */
		startOfWeek: (date, _options) => startOfWeek(date, { locale: dateLocale[locale?.name] }),
		getDay,
		locales: dateLocale,
	});
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.calendar} theme-${appliedTheme}`}>
			<Calendar
				localizer={localizer}
				events={events}
				date={currentDate}
				view={currentView}
				onNavigate={date => handlerDate(date)}
				onView={view => handlerView(view)}
				startAccessor='start'
				endAccessor='end'
				views={['month', 'week', 'day', 'agenda']}
				messages={t("calendar")}
				className={styles.calendar_main}
			/>
		</div>
	);
	// #endregion
}

export { CalendarX };