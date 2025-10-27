'use client';
/* 
	handles logic for cards notification
*/

// #region libraries
import { useRef, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
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
import { useLocale } from 'context/__core__';
// #endregion


// #region requests
// #endregion


function useNotifications({
	title = '',
	timePassed,
}) {
	// #region references
	// #endregion


	// #region contexts & hooks
	const {
		locale,
		dateLocale,
	} = useLocale({});
	// #endregion


	// #region variables
	const maxLen = 150;
	const newTitle = `${title.length >= maxLen ? `${title?.slice(0, maxLen)}...` : title}`;
	const parsedTime = timePassed ? formatDistanceToNow(timePassed, { locale: dateLocale[locale?.name] }) : '';
	// #endregion


	// #region states
	const [open, setOpen] = useState(false);
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerOpen = () => setOpen(prev => !prev);
	// #endregion


	// #region effects
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		newTitle,
		parsedTime,
		open,
		handlerOpen,
	};
	// #endregion
}


export { useNotifications };