'use client';
/* 
	handles logic to input selection component
*/
// #region libraries
import { useRef, useState } from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
import { splitString } from 'lib/helpers';
// #endregion


// #region hooks
import { useInputValue, useClickOutside } from 'hooks';
// #endregion


// #region reducers & stores
// #endregion


// #region requests
// #endregion


function useInputSelect({
	value,
	handler,
	badge = false,
	disabled = false,
}) {
	// #region references
	const dropRef = useRef(null);
	// #endregion


	// #region contexts & hooks
	const {
		inValue,
		handlerNewValue,
	} = useInputValue({
		value: value,
		handler: handler,
	});
	// #endregion


	// #region variables
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region states
	/* handles the opening of input flags */
	const [opened, setOpened] = useState(false);

	/* for display an specific element on input, acts as a visual feedback for user */
	const [keyColor, setKeyColor] = useState('');
	const [keySymbol, setKeySymbol] = useState('');
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	/* open and close the toggledrop */
	const handleToggleDrop = () => !disabled && setOpened(!opened);

	const handlerValue = (value) => {
		/* and middleware for set new value  */
		let newValue;

		if (badge) {
			const splitted = splitString(value, '|');
			newValue = splitted[0];
			setKeyColor(splitted[1]);
			setKeySymbol(splitted[2]);
		}
		else newValue = value;

		handlerNewValue(newValue)
	};
	// #endregion


	// #region others
	useClickOutside({
		ref: dropRef,
		handler: () => setOpened(false),
		enabled: opened
	});
	// #endregion


	// #region effects
	// #endregion


	// #region main
	return {
		dropRef,
		inValue,
		keyColor,
		keySymbol,
		opened,
		handlerValue,
		handleToggleDrop,
	};
	// #endregion
}


export { useInputSelect };