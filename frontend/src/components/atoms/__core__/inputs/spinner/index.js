'use client';
/* 
    ATOMS - INPUT SPINNER
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { Hint, ButtonPill } from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
import { selectLogStyle } from 'lib/helpers';
// #endregion


// #region hooks
import { useInputValue, useValidations } from 'hooks';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion



function InputSpinner({
    name = '',
    label = '',
    value,
    defaultValue = 0,
    handler,
    help = '',
    int = false,
    bold = false,
    required = false,
    disabled = false,
    validate = { min: 0, max: 100, step: 1 },
    theme = ''
}) {
    // #region hooks & others
    const {
        inValue,
        handlerNewNumber,
        HandlerIncrementValue,
        HandlerDecrementValue,
    } = useInputValue({
        value: value,
        defaultValue: defaultValue,
        validateNumbers: validate,
        handler: handler,
    });

    const {
        handlerEval,
        actualHint,
    } = useValidations({
        name: label,
        validateNumbers: validate,
        required: required,
    });


    const _handleChangeInput = (e) => {
        /* 	only for abstract the method of changeValue */
        let value = e.target.value.trim();
        /* round number if int is true */
        if (int) value = Math.round(value);

        handlerNewNumber(value);
        handlerEval(value);
    };

    const boldStyle = bold && styles.bold;
    const disabledStyle = disabled ? styles.disabled : '';
    const logStyle = actualHint ? selectLogStyle(actualHint.log, styles) : '';
    // #endregion


    // #region theme
    const { theme: globalTheme } = useThemeStore();
    const appliedTheme = theme || globalTheme;
    // #endregion


    // #region skeletons
    // #endregion


    return (
        <label
            htmlFor={name}
            className={`${styles.input} theme-${appliedTheme} ${logStyle} ${disabledStyle}`}
        >
            <p className={`${styles.input_title} ${boldStyle}`}>
                {label}
            </p>


            <div className={styles.input_main}>
                <ButtonPill
                    symbol='remove'
                    size={16}
                    handler={() => {
                        HandlerDecrementValue();
                        handlerEval(value);
                    }}
                    disabled={value !== undefined ? value <= validate?.min : inValue <= validate?.min || disabled}
                />

                <input
                    className={styles.input_element}
                    type='text'
                    name={name}
                    value={value !== undefined ? value : inValue}
                    onChange={_handleChangeInput}
                    disabled={disabled}
                    required={required}
                    step={validate.step}
                />

                <ButtonPill
                    symbol='add'
                    size={16}
                    handler={() => {
                        HandlerIncrementValue();
                        handlerEval(value);
                    }}
                    disabled={value !== undefined ? value >= validate?.max : inValue >= validate?.max || disabled}
                />
            </div>


            {help && !actualHint.label &&
                <Hint
                    label={help}
                    theme={appliedTheme}
                    disabled={disabled}
                    help
                />
            }


            {actualHint.label &&
                <div className={styles.input_hints}>
                    <Hint
                        label={actualHint.label}
                        state={actualHint.log}
                        disabled={disabled}
                        theme={appliedTheme}
                    />
                </div>
            }
        </label>
    );
}

export { InputSpinner };