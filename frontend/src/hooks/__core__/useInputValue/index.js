'use client';
/* 
	for controls input values from different types
*/
// #region libraries
import { useState } from 'react';
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


function useInputValue({
	value,
	checked,
	defaultValue,
	validateNumbers = { min: 0, max: 10, step: 0.5 },
	handler,
}) {
	// #region contexts
	// #endregion


	// #region references
	// #endregion


	// #region variables
	const min = validateNumbers.min;
	const max = validateNumbers.max;
	const step = validateNumbers.step;
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region states
	const [inValue, setInValue] = useState(defaultValue?.toString() || '');
	const [inChecked, setInChecked] = useState(checked || false);

	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const HandlerIncrementValue = (value) => {
		/* this is for spinner buttons increment */
		const newValue = parseInt(value || inValue);

		if (newValue + step <= max) {
			handlerNewValue((newValue + step).toString());
		};
	};

	const HandlerDecrementValue = (value) => {
		/* this is for spinner buttons decrement */
		const newValue = parseInt(value || inValue);

		if (newValue + step >= min) {
			handlerNewValue((newValue - step).toString());
		};
	};


	const handlerNewNumber = (newValue) => {
		/* for change input number */
		let actualValue;

		if (newValue >= min && newValue <= max) {
			actualValue = newValue;
		}

		else if (newValue < min) {
			actualValue = min;
		}

		else if (newValue > max) {
			actualValue = max;
		};

		handlerNewValue(actualValue);
	};


	const handlerNewValue = (newValue) => {
		/*  sets the new state */
		handler && handler(newValue);
		value === undefined && setInValue(newValue);
	};


	const handlerDeleteValue = () => {
		/* erase the data on input */
		handler && handler('');
		value === undefined && setInValue('');
	};


	const handlerChecked = (event) => {
		/* use it on input bool formats as like as check, radio and others */
		const newChecked = event?.target?.checked;
		const newValue = checked === undefined ? !inChecked : newChecked;

		handler && handler(newValue);
		checked === undefined && setInChecked(newValue);
	};
	// #endregion


	// #region effects
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		inValue,
		inChecked,
		HandlerIncrementValue,
		HandlerDecrementValue,
		handlerNewNumber,
		handlerNewValue,
		handlerDeleteValue,
		handlerChecked,
	};
	// #endregion
}


export { useInputValue };