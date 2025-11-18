'use client';
/*
	handles logic for input pin
*/
// #region libraries
import { useRef, useState } from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
import { useValidations } from 'hooks';
// #endregion


// #region reducers & stores
// #endregion


// #region requests
// #endregion


function useInputPin({
	label = '',
	confirmValue = '',
	handler,
	size,
}) {
	// #region references
	const pinRefs = useRef([]);
	// #endregion


	// #region contexts & hooks
	const {
		actualRegex,
		actualHint,
		handlerRegex,
		handlerHint,
	} = useValidations({
		name: label,
		validateProperty: 'pin',
		validateRegex: 'evalPin',
	});
	// #endregion


	// #region variables
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region states
	const [inValue, setInValue] = useState(Array(size).fill(''));
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const _handlerValidations = (value) => {
		/* handles the validations and apply if necesary */
		if (confirmValue && value.length === size) {
			if (value === confirmValue) handlerHint('done');
			else handlerHint('error');
		};
	};

	const _handlerNewValue = (newValue = []) => {
		/*  sets the new state */
		const joinedValue = newValue.join('');

		setInValue(newValue);
		_handlerValidations(joinedValue);

		if (handler) handler(joinedValue);
	};

	const _handlerDeleteValue = (index) => {
		/* handle the delete on inputs & state */
		const newValues = [...inValue];
		newValues[index] = '';

		pinRefs.current[index].value = '';
		_handlerNewValue(newValues);
	};


	const handlerNewValue = (index, event) => {
		/* this checks the input, apply the regex and change to new input */
		const newPin = event.target.value;
		const test = handlerRegex(newPin);

		if (test) {
			const newValues = [...inValue];
			newValues[index] = newPin;
			_handlerNewValue(newValues);

			if (index < size - 1) pinRefs.current[index + 1].focus();
		}
	};


	const handlerKeyDownPin = (index, event) => {
		/* handles when the user delete or add a new input value */
		if (event.key === 'Backspace') {
			if (index > 0) pinRefs.current[index - 1].focus();
			return _handlerDeleteValue(index);
		};

		if (event.key != 'Backspace' && pinRefs.current[index].value) {
			if (index < size - 1) pinRefs.current[index + 1].focus();
		};
	}

	// #endregion


	// #region effects
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		pinRefs,
		inValue,
		actualRegex,
		actualHint,
		handlerNewValue,
		handlerKeyDownPin,
	};
	// #endregion
}


export { useInputPin };
