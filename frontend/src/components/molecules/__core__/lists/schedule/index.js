'use client';
/* 
	MOLECULES - LIST SCHEDULE
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { ListScheduleSkeleton } from './skeleton';
import {
	Badge,
	ButtonPill,
	ControlSwitch,
	Hint,
	InputSelect
} from 'components/atoms';

import { More } from 'components/molecules';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
import { helperGenerateSchedule } from 'lib/helpers';
// #endregion


// #region hooks
import { THEME_ENUM } from 'context/__core__/theme/__data__';
import { useListSchedule } from './useListSchedule';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function ListSchedule({
	title = 'monday',
	subtitle = 'Select an opening & closing hour',
	label = '',
	icon = '',
	symbol = 'schedule',
	color = colorsApp.blue,
	elements = [['', '']],
	options = [],
	interval = 30,
	maxElements = 3,
	loading = false,
	active = true,
	handler,
	theme = ''
}) {
	// #region hooks & others
	const {
		activeIn,
		inputs,
		actualHint,
		handlerAddInput,
		handlerDeleteInput,
		handlerActiveIn,
		handlerSetNewValue,
	} = useListSchedule({
		elements: elements,
		maxElements: maxElements,
		handler: handler,
		active: active,
	});

	const inOptions = options.length > 0 ? options : helperGenerateSchedule(interval);
	const inactiveInStyle = !activeIn ? styles.disabled : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	if (loading) return (
		<ListScheduleSkeleton theme={appliedTheme} />
	);
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.list} theme-${appliedTheme} ${inactiveInStyle}`}>
			{icon || symbol &&
				<div className={styles.list_symbol}>
					<Badge
						icon={icon}
						symbol={symbol}
						size={24}
						color={color}
						rounded
						pill
					/>
				</div>
			}


			<div className={styles.list_summary}>
				<label className={styles.list_summary_main}>
					<div className={styles.list_summary_resume}>
						<p className={styles.list_title}>
							{title}
						</p>

						<p className={styles.list_subtitle}>
							{subtitle}
						</p>

						<div className={styles.list_label}>
							{label}
						</div>
					</div>

					<ControlSwitch
						value={activeIn}
						handler={handlerActiveIn}
					/>
				</label>


				<div className={styles.list_call}>
					{inputs?.map((item, i) => (
						<div
							key={i}
							className={styles.list_call_element}
						>
							<div className={styles.list_call_element_main}>
								<InputSelect
									name='opening'
									label='Apertura'
									placeholder='AM / PM'
									value={item[0]}
									handler={(value) => handlerSetNewValue({
										index: i,
										position: 0,
										value: value,
									})}
									options={inOptions}
									disabled={!activeIn}
								/>

								<InputSelect
									name='closing'
									label='Cierre'
									placeholder='AM / PM'
									value={item[1]}
									handler={(value) => handlerSetNewValue({
										index: i,
										position: 1,
										value: value,
									})}
									options={inOptions}
									disabled={!activeIn}
								/>
							</div>


							<div className={styles.list_call_element_close}>
								{i !== 0 &&
									<ButtonPill
										symbol='close'
										color={appliedTheme === THEME_ENUM.DARK ? colorsApp.dark_red : colorsApp.red}
										handler={() => handlerDeleteInput(i)}
										disabled={!activeIn}
									/>
								}
							</div>
						</div>
					))}


					{actualHint.label ?
						<Hint
							label={actualHint.label}
							state={actualHint.log}
							theme={appliedTheme}
							disabled={!activeIn}
						/>
						:
						<>
							{activeIn &&
								<More
									label='Nuevo horario'
									handler={handlerAddInput}
								/>
							}
						</>
					}
				</div>
			</div>
		</div>
	);
	// #endregion
}

export { ListSchedule };