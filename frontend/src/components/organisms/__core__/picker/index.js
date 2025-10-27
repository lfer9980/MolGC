'use client';
/* 
	ORGANISMS - PICKER X
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import DatePicker from 'react-datepicker';
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
import { useInputValue } from 'hooks';
// #endregion


// #region context & stores
import { useLocale } from 'context/__core__';
// #endregion


// #region styles
import styles from './styles.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import { useThemeStore } from 'context/__core__';
// #endregion



function PickerDateX({
	value,
	excludeDates = [],
	handler,
	theme = ''
}) {
	// #region hooks & others
	const {
		locale,
		dateLocale
	} = useLocale({});

	const {
		inValue,
		handlerNewValue
	} = useInputValue({
		value: value,
		handler: handler,
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
		<div className={`${styles.picker} theme-${appliedTheme}`}>
			<DatePicker
				selected={value !== undefined ? value : inValue}
				onChange={(date) => handlerNewValue(date)}
				timeFormat='HH:mm'
				timeIntervals={15}
				dateFormat='dd/MM/yyyy HH:mm'
				locale={dateLocale[locale?.name]}
				calendarStartDay={0}
				excludeDates={excludeDates}
				inline
			/>
		</div>
	);
	// #endregion
}

export { PickerDateX };