'use client';
/*
	ORGANISMS - PICKER HOUR
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { ButtonPill } from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
// #endregion


// #region hooks
import { useInputValue } from 'hooks';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function PickerHourX({
	hours = [],
	value,
	handler,
	theme = ''
}) {
	// #region hooks & others
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
			{hours?.map((item, i) => {
				if (!item.available) {
					return (
						<ButtonPill
							key={i}
							label={item.label}
							color={colorsApp.gray}
							disabled
						/>
					);
				};

				if (value === item.label || inValue === item.label) {
					return (
						<ButtonPill
							key={i}
							label={item.label}
							color={colorsApp.blue}
							handler={() => handlerNewValue(item.label)}
						/>
					);
				};

				return (
					<ButtonPill
						key={i}
						label={item.label}
						color={colorsApp.transparent}
						handler={() => handlerNewValue(item.label)}
					/>
				);
			})}
		</div>
	);
	// #endregion
}

export { PickerHourX };
