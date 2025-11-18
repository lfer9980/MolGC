'use client';
/*
	ORGANISMS - TIMERX
*/
// #region libraries
import React, { useEffect, useRef } from 'react';
// #endregion


// #region components
import { TimerXSkeleton } from './skeleton';
import {
	ButtonPill,
	InputSelect,
	Tooltip
} from 'components/atoms';

// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
import { STYLE_DIR_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
import { useTimer } from './useTimer';
import { useActivateAnimation } from 'hooks';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function TimerX({
	mode = 'countdown',
	options = [0.5, 1, 5, 10, 15, 20, 30, 40, 50, 60],
	mini = false,
	controls = false,
	border = true,
	flexend = false,
	handler,
	theme = ''
}) {

	// #region hooks & others
	const firstLoad = useRef(true);

	const {
		time,
		timeSpan,
		paused,
		stopped,
		loading,
		edit,
		fetching,
		handlerPause,
		handlerPlay,
		handlerStop,
		handlerReset,
		open,
		handlerFormat,
		handlerOpen,
	} = useTimer({
		mode: mode,
	});


	const {
		animation,
		animationBase,
	} = useActivateAnimation({
		interval: 0,
		animationName: 'animate__fadeInDown'
	});

	/* executes something when timer is reaching out on countdown */
	useEffect(() => {
		if (firstLoad.current) {
			firstLoad.current = false;
			return;
		};

		if (time <= 0 & mode === 'countdown' && handler) {
			handler && handler();
			handlerStop();
		};
	}, [mode, time, handler, handlerStop]);


	const miniStyle = mini ? styles.mini : '';
	const borderStyle = border ? styles.border : '';
	const warningStyle = mode === 'countdown' && time != 0 && time <= timeSpan * 0.7 ? styles.warning : '';
	const flexendStyle = flexend ? styles.flexend : '';
	const endStyle = time < 0 ? styles.end : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	if (loading) return (
		<TimerXSkeleton
			mini={mini}
			controls={controls}
		/>
	);
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.timer} theme-${appliedTheme}`}>
			{edit &&
				<div className={`${styles.timer_edit} ${animation} ${animationBase}`}>
					<div className={styles.timer_control}>
						<div className={styles.timer_button}>
							<ButtonPill
								symbol={open ? 'close' : 'add'}
								color={open ? colorsApp.red : colorsApp.black}
								handler={handlerOpen}
							/>
						</div>
					</div>

					{open &&
						<div className={styles.timer_input}>
							<InputSelect
								placeholder='Anadir tiempo (en minutos)'
								options={options}
								handler={(value) => {
									handlerReset(value);
									handlerOpen();
								}}
							/>
						</div>
					}
				</div>
			}


			<div className={`${styles.timer_main} ${miniStyle} ${borderStyle} ${flexendStyle}`}>
				<div className={`${styles.timer_digit} ${miniStyle}`}>
					{time < 0 &&
						<div className={`${styles.timer_digit_minus} ${miniStyle} ${animation} ${animationBase}`}>
							<p className={`${warningStyle} ${endStyle}`}>
								&#8211;
							</p>
						</div>
					}

					<p className={`${warningStyle} ${endStyle}`}>
						{handlerFormat(time).split(':')[0]}
					</p>
					<span className={styles.timer_digit_type}> {mini ? ':' : 'hrs'} </span>
				</div>

				<div className={`${styles.timer_digit} ${miniStyle}`}>
					<p className={`${warningStyle} ${endStyle}`}>
						{handlerFormat(time).split(':')[1]}
					</p>
					<span className={styles.timer_digit_type}> {mini ? ':' : 'min'} </span>
				</div>

				<div className={`${styles.timer_digit} ${miniStyle}`}>
					<p className={`${warningStyle} ${endStyle}`}>
						{handlerFormat(time).split(':')[2]}
					</p>
					<span className={styles.timer_digit_type}> {mini ? '' : 'seg'} </span>
				</div>
			</div>


			{!mini &&
				<p className={`${styles.timer_label} ${warningStyle} ${endStyle} $${flexendStyle}`}>
					{time < 0 ? 'SE TERMINO EL TIEMPO' : 'TIEMPO RESTANTE'}
				</p>
			}


			{controls && !edit &&
				<div className={`${styles.timer_actions} ${animationBase} ${animation}`}>
					<div className={styles.timer_control}>
						<div className={styles.timer_button}>
							<ButtonPill
								symbol={paused || stopped ? 'play_arrow' : 'pause'}
								color={fetching ? colorsApp.disabled : paused || stopped ? colorsApp.green : colorsApp.blue}
								handler={() => !fetching && (paused || stopped) ? handlerPlay() : handlerPause()}
							/>
						</div>
					</div>

					<div className={styles.timer_control}>
						<div className={styles.timer_button}>
							<ButtonPill
								symbol='stop'
								color={colorsApp.red}
								handler={handlerStop}
							/>
						</div>

						<div className={styles.timer_tooltip}>
							<Tooltip
								label={'Detener reloj'}
								direction={STYLE_DIR_ENUM.NONE}
							/>
						</div>
					</div>
				</div>
			}
		</div>
	);
	// #endregion
}

export { TimerX };
