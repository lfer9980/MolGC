'use client';
/*
	handles the logic for input phone component
*/
// #region libraries
import { useEffect, useRef, useState } from 'react';
import { PhoneNumberUtil } from 'google-libphonenumber';
import {
	defaultCountries,
	parseCountry,
	usePhoneInput
} from 'react-international-phone';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
/* this function evaluates if the phone actually complains the standar according to the country  */
const _phoneUtil = PhoneNumberUtil.getInstance();


/**
 * The function `_handlePhoneValidate` validates a phone number input using a phone utility library in
 * JavaScript.
 * @param phone - The `_handlePhoneValidate` function takes a phone number as input and performs
 * validation on it using a phone utility library. The function attempts to parse the input phone
 * number and then checks if it is a valid phone number according to the library's validation rules. If
 * any errors occur during the validation process,
 * @returns The function `_handlePhoneValidate` is returning a boolean value. It returns `true` if the
 * input phone number is valid according to the phone util's validation rules, and `false` if there is
 * an error during the validation process.
 */
const _handlePhoneValidate = (phone) => {
	/* this executes the input validation from phone util */
	try {
		const parsedNumber = _phoneUtil.parseAndKeepRawInput(phone);
		return _phoneUtil.isValidNumber(parsedNumber);

	} catch (error) {
		console.log('Error al validar el número:', error);
		return false;
	}
};


/**
 * The function `_handlerFilterCountries` filters default countries from a library of international
 * phone codes based on a provided filter.
 * @param countries - The `countries` parameter is an array containing ISO2 country codes.
 * @returns The function `_handlerFilterCountries` is returning an array of default countries filtered
 * based on the ISO2 codes that are included in the `countries` array passed as a parameter.
 */
const _handlerFilterCountries = (countries) => {
	/* to filter default countries from library international phone, the filter is passed by parameter */
	return defaultCountries.filter((country) => {
		const { iso2 } = parseCountry(country);
		return [...countries].includes(iso2);
	});
};
// #endregion


//#region hooks
import {
	useInputValue,
	useValidations,
	useClickOutside
} from 'hooks';
// #endregion


// #region reducers & stores
// #endregion


// #region requests
// #endregion


function useInputPhone({
	label,
	value,
	handler,
	countries = ['mx', 'us'],
	disabled = false,
	required = false,
}) {
	// #region references
	const dropRef = useRef(null);
	// #endregion


	// #region contexts & hooks
	const {
		inValue,
		handlerNewValue,
		handlerDeleteValue,
	} = useInputValue({
		value: value,
		handler: handler,
	});

	const {
		actualHint,
		handlerHint,
		handlerRequiredValues,
	} = useValidations({
		name: label,
		validateProperty: 'phone',
		required: required,
	});
	// #endregion


	// #region variables
	/* from all countries on default countries, bring only the specified ones  */
	const filteredCountries = _handlerFilterCountries(countries);

	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region states
	/* handles the opening of input flags */
	const [opened, setOpened] = useState(false);
	const [onDelete, setOnDelete] = useState(false);

	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	/* open and close the toggledrop */
	const handleToggleDrop = () => !disabled && setOpened(!opened);

	const handleChangeInputDelete = () => {
		/* deletes and reset to true if value is required */
		handlerDeleteValue();
		handlerRequiredValues(true);
	};

	const handleKeyDown = (event) => event.key === 'Backspace' && setOnDelete(true);
	const handleKeyUp = (event) => event.key === 'Backspace' && setOnDelete(false);
	// #endregion


	// #region others
	/* hook from international phone to get functions and use it on a custom UI */
	const {
		inputValue,
		handlePhoneValueChange,
		country,
		setCountry,
	} = usePhoneInput({
		defaultCountry: 'mx',
		countries: filteredCountries,
		value: value !== undefined ? value : inValue,
		onChange: ({ phone, inputValue }) => {
			let newValue;

			/* this is to solve problems while delete number with backspace */
			if (onDelete) newValue = phone;
			else newValue = inputValue;

			/* if the number is required, this changes to fault state */
			if (inputValue.length < 6 && required) handlerRequiredValues();

			handlerNewValue(newValue);
		},
	});


	useClickOutside({
		ref: dropRef,
		handler: () => setOpened(false),
		enabled: opened,
	});
	// #endregion


	// #region effects
	useEffect(() => {
		/* this useeffect is for handle correctly the number avoiding empty or undifined phones issue */
		if (inputValue.length > 6) {
			const isValidPhone = _handlePhoneValidate(inputValue);

			/* change the actual handler */
			if (isValidPhone) handlerHint('done');
			else handlerHint('error');
		};
	}, [inputValue, country, handlerHint]);
	// #endregion


	// #region main
	return {
		dropRef,
		filteredCountries,
		inValue,
		actualHint,
		opened,
		country,
		setCountry,
		handleToggleDrop,
		handlePhoneValueChange,
		handleChangeInputDelete,
		handleKeyUp,
		handleKeyDown,
	};
	// #endregion
}


export { useInputPhone };
