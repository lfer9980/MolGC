'use client';
/*
	MOLECULES - LIST BADGE
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
// #endregion


// #region assets
import {
	Badge,
	HeadingSubtitle,
	Tooltip
} from 'components/atoms';
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
// #endregion


// #region hooks
import { STYLE_DIR_ENUM } from 'lib/helpers';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function ListBadge({
	title = '',
	subtitle = '',
	label = '',
	elements = [{ name: '', color: colorsApp.blue, type: '' }],
	tooltip = '',
	size = 24,
	theme = ''
}) {
	// #region hooks & others
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.list} theme-${appliedTheme}`}>
			<HeadingSubtitle
				title={title}
				subtitle={subtitle}
				label={label}
			/>


			<div className={styles.list_main}>
				{elements?.map((item, i) => (
					<Badge
						key={i}
						icon={item?.type === 'icon' ? item.name : ''}
						symbol={item?.type === 'symbol' ? item.name : ''}
						alt={item?.name}
						color={item?.color}
						size={size}
						rounded
						pill
					/>
				))}

				{tooltip &&
					<div className={styles.list_help}>
						<div className={styles.list_symbol}>
							<Badge
								symbol='help'
								size={21}
							/>
						</div>

						<div className={styles.list_tooltip}>
							<Tooltip
								label={tooltip}
								direction={STYLE_DIR_ENUM.BOTTOM}
							/>
						</div>
					</div>
				}
			</div>
		</div>
	);
	// #endregion
}

export { ListBadge };
