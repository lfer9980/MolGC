'use client';
/* 
	ORGANISMS - CHART WRAP
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import {
	Badge,
	HeadingTitle,
	Loader,
	LOADER_ENUM,
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
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function ChartWrap({
	title = '',
	label = '',
	help = '',
	children,
	loading = false,
	mini = false,
	noHover = false,
	theme = ''
}) {
	// #region hooks & others
	const miniStyle = mini ? styles.mini : '';
	const hoverStyle = !noHover ? styles.hover : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<article className={`${styles.chart} theme-${appliedTheme} ${miniStyle} ${hoverStyle}`}>
			{(title || label) &&
				<div className={styles.chart_title}>
					{mini ?
						<div className={styles.chart_title_main}>
							<p>{title}</p>
							<p>{label}</p>
						</div>
						:
						<HeadingTitle
							title={title}
							label={label}
							theme={theme}
						/>
					}

					{help &&
						<div className={styles.chart_help}>
							<Badge
								symbol='info'
								color={colorsApp.blue}
								size={24}
								pill
							/>

							<div className={styles.chart_help_main}>
								<Tooltip
									direction={STYLE_DIR_ENUM.BOTTOM}
									label={help}
								/>
							</div>
						</div>
					}
				</div>
			}

			{!mini &&
				<div className={styles.chart_divisor} />
			}

			<div className={styles.chart_main}>
				{loading ?
					<Loader type={LOADER_ENUM.SPINNER} number={1} />
					:
					<>{children}</>
				}
			</div>
		</article>
	);
	// #endregion
}

export { ChartWrap };