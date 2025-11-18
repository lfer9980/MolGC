'use client';
/*
	handler limit char, hints and others on textarea input
*/
// #region libraries
import React, { useState } from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion

// #region utils
import { useInputValue, useValidations } from 'hooks';
// #endregion


// #region reducers & stores
// #endregion


// #region requests
// #endregion


function useArea({
	label,
	value,
	handler,
	maxChar,
	required = false,
	upperCase,
}) {
	// #region references
	// #endregion


	// #region contexts & hooks
	const {
		inValue,
		handlerNewValue,
	} = useInputValue({
		value: value,
		handler: handler,
	});

	const {
		actualHint,
		handlerHint,
	} = useValidations({
		name: label,
		validateProperty: 'maxChar',
		required: required,
	});
	// #endregion


	// #region variables
	/* when chars on input exceeds 70% of max char, change to positive state */
	const okChar = maxChar * 0.70;
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region states
	const [count, setCount] = useState(0);
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const _handleValidations = (value) => {
		/* handles the setting of hints */
		const valLen = value?.length;

		if (valLen < okChar) return handlerHint('');
		if (valLen >= okChar && valLen < maxChar) return handlerHint('done');
		if (valLen >= maxChar - 1) return handlerHint('error');
	};


	const handleChangeValue = (e) => {
		/* 	only for abstract the method of changeValue */
		let value = e.target.value.trim();
		/*  change to uppercase */
		if (upperCase) value = value.toUpperCase();

		/* limit the max ammount of chars */
		if (value.length < maxChar) handlerNewValue(value);

		setCount(value.length);
		/* invokes handler for validations */
		_handleValidations(value);
	};

	// #endregion


	// #region effects
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		inValue,
		actualHint,
		count,
		handleChangeValue,
	};
	// #endregion
}


export { useArea };
