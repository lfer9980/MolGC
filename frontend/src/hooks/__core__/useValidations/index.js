'use client';
/* 
	validation center
*/
// #region libraries
import { useState } from 'react';
// #endregion


// #region components
// #endregion


// #region assets
import regex from 'lib/__core__/JSON/regex.json';
import hints from 'lib/__core__/JSON/hints.json';
// #endregion

// #region utils
import { helperFindJSON } from 'lib/helpers';
// #endregion


// #region reducers & stores
import { useFaultStore } from 'store/__core__/fault';
// #endregion


// #region requests
// #endregion


function useValidations({
	name = '',
	validateProperty,
	validateRegex,
	validateNumbers,
	required = false,
}) {
	// #region contexts
	const {
		handlerAddFaultState,
		handlerRemoveFaultState
	} = useFaultStore();
	// #endregion


	// #region references
	// #endregion


	// #region variables
	const evalHints = helperFindJSON({ object: hints, property: validateProperty });
	const evalRegex = helperFindJSON({ object: regex, property: validateRegex });

	const REQUIRED_LABEL = 'este valor es obligatorio.';
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region states
	const [actualRegex, setActualRegex] = useState([]);
	const [actualHint, setActualHint] = useState({ label: '', log: '' });
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const _handlerEmptyValues = (value) => {
		/* checks if its empty AND required */
		if (value.length === 0) {
			handlerRequiredValues();
			return true;
		}
		return false;
	};


	const handlerRequiredValues = (reset = false) => {
		/* checks if its required */
		if (required) {
			setActualHint({ label: REQUIRED_LABEL, log: 'error' });
			setActualRegex([REQUIRED_LABEL]);
			handlerAddFaultState(name, [REQUIRED_LABEL]);
		};

		if (reset) {
			setActualHint({ label: '', log: '' });
			setActualRegex([]);

			if (required) handlerRemoveFaultState(name);
		};
	};


	const handlerHint = (hint) => {
		/* manage the hints displaying */
		let newHint = helperFindJSON({
			object: evalHints,
			property: hint
		});

		if (newHint) setActualHint(newHint);
		else setActualHint({ log: '', label: '' });

		/* TODO: RESOLVE this re rendering issue when set to fault state here */
		/* change to fault state if something goes wrong */
		// if (newHint != 'done') handlerAddFaultState(name, [...newHint.label]);
		// else handlerRemoveFaultState(name);
	};


	const handlerRegex = (value) => {
		/* set and evaluates regex, change to default state */
		if (evalRegex === null) return;
		if (_handlerEmptyValues(value)) return;

		/* tests */
		const testRegex = evalRegex.reduce((acc, item) => {
			const regex = new RegExp(item.eval);
			if (!regex.test(value)) acc.push(item.label);

			return acc;
		}, []);

		setActualRegex(testRegex);

		/* change faulted state */
		if (testRegex.length != 0) handlerAddFaultState(name, testRegex);
		else handlerRemoveFaultState(name);

		return testRegex.length === 0;
	}


	const handlerEval = (value) => {
		if (value < validateNumbers.min) {
			setActualHint({
				log: 'warning',
				label: `el valor minimo para este campo es ${validateNumbers.min}`
			});
		}

		else if (value > validateNumbers.max) {
			setActualHint({
				log: 'warning',
				label: `el valor maximo para este campo es ${validateNumbers.max}`
			});
		}

		else {
			setActualHint({});
		}
	};

	// #endregion 

	// #region effects
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		actualHint,
		actualRegex,
		handlerHint,
		handlerRegex,
		handlerEval,
		handlerRequiredValues,
	};
	// #endregion
}


export { useValidations };