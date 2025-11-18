'use client';
/*
	handles logic for list schedule
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

// #region hooks
import { useValidations } from 'hooks';
// #endregion

// #region reducers & stores
// #endregion


// #region requests
// #endregion


function useListSchedule({
	elements = [],
	maxElements,
	active,
	handler,
}) {
	// #region references
	// #endregion


	// #region contexts & hooks
	const {
		actualHint,
		handlerHint,
	} = useValidations({
		validateProperty: 'schedule'
	});
	// #endregion


	// #region variables
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region states
	const [inputs, setInputs] = useState(elements);
	const [activeIn, setActiveIn] = useState(active);
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerAddInput = () => {
		const newElements = [...inputs];

		if (newElements.length < maxElements) {
			newElements.push(['', '']);
			setInputs(newElements);
		}
		else {
			handlerHint('error');
		};
	};


	const handlerDeleteInput = (index) => {
		const newElements = [...inputs];

		if (newElements.length > 0) {
			newElements.splice(index, 1);
			setInputs(newElements);
			handlerHint('done');
		};
	};


	const handlerSetNewValue = ({ index, position, value }) => {
		const newElements = inputs.map((item, i) => {
			let newItem = [...item];
			if (i === index) newItem[position] = value;
			return newItem;
		});

		if (activeIn) {
			setInputs(newElements);
			handler && handler(newElements);
		};
	};

	const handlerActiveIn = () => setActiveIn(prev => !prev);
	// #endregion


	// #region effects
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		activeIn,
		inputs,
		actualHint,
		handlerAddInput,
		handlerDeleteInput,
		handlerActiveIn,
		handlerSetNewValue,
	};
	// #endregion
}


export { useListSchedule };
