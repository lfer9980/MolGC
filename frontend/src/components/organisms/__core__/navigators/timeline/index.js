'use client';
/*
	ORGANISMS - NAVIGATORS - TIMELINE
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { NavigatorTimelineSkeleton } from './skeleton';
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
import { useNavTime, SCROLL_DIR } from './useNavTime';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function NavigatorTimeline({
	value = { year: '', month: '' },
	handler,
	years = [],
	months = [],
	loading = false,
	vertical = false,
	theme = ''
}) {
	// #region hooks & others
	const {
		scrollYears,
		scrollMonths,
		inValue,
		handlerSetNav,
		handlerScroll
	} = useNavTime({
		value: value,
		handler: handler,
	});

	const verticalStyle = vertical ? styles.vertical : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	if (loading) return (
		<NavigatorTimelineSkeleton
			vertical={vertical}
			theme={theme}
		/>
	);
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.time} theme-${appliedTheme}`}>
			<div className={`${styles.time_wrap} ${verticalStyle}`}>
				<div className={`${styles.time_left} ${verticalStyle}`}>
					<button
						className={styles.time_button}
						onClick={() => {
							handlerScroll({
								direction: vertical ? SCROLL_DIR.UP : SCROLL_DIR.LEFT,
								scroller: scrollYears
							});
						}}
					>
						<span className='material-symbols-outlined'>
							{vertical ? 'keyboard_arrow_up' : 'arrow_left'}
						</span>
					</button>

					<button
						className={styles.time_button}
						onClick={() => {
							handlerScroll({
								direction: vertical ? SCROLL_DIR.UP : SCROLL_DIR.LEFT,
								scroller: scrollMonths
							});
						}}
					>
						<span className='material-symbols-outlined'>
							{vertical ? 'keyboard_arrow_up' : 'arrow_left'}
						</span>
					</button>
				</div>


				{/* MAIN */}
				<div className={`${styles.time_main} ${verticalStyle}`}>
					<div
						ref={scrollYears}
						className={`${styles.time_scroll} ${verticalStyle}`}
					>
						<div className={`${styles.time_years} ${verticalStyle}`}>
							{years?.map((item) => (
								<span
									key={item}
									className={`${styles.time_element} ${item === inValue.year ? styles.active : ''}`}
									onClick={() => {
										handlerSetNav({
											element: item,
											type: 'year',
										})
									}}
								>
									{item}
								</span>
							))}
						</div>
					</div>

					<div
						ref={scrollMonths}
						className={`${styles.time_scroll} ${verticalStyle}`}
					>
						<div className={`${styles.time_months} ${verticalStyle}`}>
							{months?.map((item) => (
								<span
									key={item}
									className={`${styles.time_element} ${item === inValue.month ? styles.active : ''}`}
									onClick={() => {
										handlerSetNav({
											element: item,
											type: 'month',
										})
									}}
								>
									{item}
								</span>
							))}
						</div>
					</div>
				</div>


				<div className={`${styles.time_right} ${verticalStyle}`}>
					<button
						className={styles.time_button}
						onClick={() => {
							handlerScroll({
								direction: vertical ? SCROLL_DIR.DOWN : SCROLL_DIR.RIGHT,
								scroller: scrollYears
							});
						}}
					>
						<span className='material-symbols-outlined'>
							{vertical ? 'keyboard_arrow_down' : 'arrow_right'}
						</span>
					</button>

					<button
						className={styles.time_button}
						onClick={() => {
							handlerScroll({
								direction: vertical ? SCROLL_DIR.DOWN : SCROLL_DIR.RIGHT,
								scroller: scrollMonths
							});
						}}
					>
						<span className='material-symbols-outlined'>
							{vertical ? 'keyboard_arrow_down' : 'arrow_right'}
						</span>
					</button>
				</div>
			</div>
		</div >
	);
	// #endregion
}

export { NavigatorTimeline };
