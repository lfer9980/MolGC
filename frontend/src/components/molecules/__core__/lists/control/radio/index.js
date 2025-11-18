'use client';
/*
	MOLECULES - LIST CONTROL RADIO
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { ListControlRadioSkeleton } from './skeleton';
import { Badge, ControlRadio } from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
// #endregion


// #region hooks
// #endregion


// #region styles
import styles from '../styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function ListControlRadio({
	name = '',
	title = '',
	subtitle = '',
	options = [],
	icon = '',
	symbol = '',
	size = 24,
	color = colorsApp.blue,
	value,
	handler,
	disabled = false,
	loading = false,
	theme = ''
}) {
	// #region hooks & others
	const disabledStyle = disabled ? styles.disabled : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	if (loading) return (
		<ListControlRadioSkeleton
			sizeBadge={size}
			appliedTheme={appliedTheme}
		/>
	);
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.list} theme-${appliedTheme} ${disabledStyle}`}>
			{icon || symbol &&
				<div className={styles.list_badge}>
					<Badge
						symbol={symbol}
						icon={icon}
						size={size}
						color={color}
						disabled={disabled}
						pill
					/>
				</div>
			}

			<div className={styles.list_main}>
				<div className={styles.list_main_item}>
					{title &&
						<p className={styles.list_title}>
							{title}
						</p>
					}

					{subtitle &&
						<p className={styles.list_subtitle}>
							{subtitle}
						</p>
					}

					<div className={styles.list_options}>
						{options?.map((item) => {
							return (
								<label
									key={item}
									className={styles.list_options_item}
								>
									<p>{item}</p>

									<div className={styles.list_main_control}>
										<ControlRadio
											name={name}
											disabled={disabled}
											selected={value === item}
											label={item}
											handler={handler}
										/>
									</div>
								</label>
							);
						})}
					</div>
				</div>
			</div>
		</div >
	);
	// #endregion
}

export { ListControlRadio };
