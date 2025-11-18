'use client';
/*
	ATOMS - TAB RADIO
	General structure for UI Component.
*/
// #region libraries
import React, { useState } from 'react';
// #endregion


// #region components
import { TabRadioSkeleton } from './skeleton';
import { InputDate, InputRadio } from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
import { useInputValue } from 'hooks';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function TabRadio({
	name = '',
	label = '',
	help = '',
	value,
	defaultValue,
	options = [],
	handler,
	date = false,
	loading = false,
	theme = ''
}) {
	// #region hooks & others
	const {
		inValue,
		handlerNewValue,
	} = useInputValue({
		value: value,
		handler: handler,
		defaultValue: defaultValue,
	});


	const [selected, setSelected] = useState(false);
	const handlerSelected = () => setSelected(!selected);

	const selectedStyle = selected ? styles.selected : '';
	const dateStyle = date ? styles.date : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	if (loading) return (
		<TabRadioSkeleton />
	);
	// #endregion


	// #region main UI
	return (
		<article className={`${styles.tab} ${dateStyle} theme-${appliedTheme}`}>
			<div
				className={`${styles.tab_label} ${selectedStyle}`}
				onClick={(event) => {
					event.preventDefault;
					event.stopPropagation;
					handlerSelected();
				}}
			>
				<p>{label}</p>
			</div>


			<div className={`${styles.tab_main} ${selectedStyle}`}>
				<fieldset>
					<label htmlFor={name}>
						{date ?
							<div className={styles.tab_date}>
								<InputDate
									value={value !== undefined ? value : inValue}
									handler={handlerNewValue}
									help={help}
								/>
							</div>
							:
							<InputRadio
								name={name}
								value={value !== undefined ? value : inValue}
								handler={handlerNewValue}
								options={options}
								disabled={!selected}
								help={help}
							/>
						}
					</label>
				</fieldset>
			</div>
		</article>
	);
	// #endregion
}

export { TabRadio };
