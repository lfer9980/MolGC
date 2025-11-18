'use client';
/*
	ATOMS - TAB ROUTE
*/
// #region libraries
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
// #endregion


// #region components
import { Badge, Tooltip } from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
import {
	selectStyle,
	STYLE_DIR_ENUM,
	STYLE_ENUM
} from 'lib/helpers';
// #endregion


// #region hooks
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function TabRouter({
	aspect = STYLE_ENUM.SECOND,
	icon,
	symbol = '',
	label = 'label',
	size = 24,
	href = '',
	handler,
	theme = ''
}) {
	// #region hooks & others
	const [hover, setHover] = useState(false);

	const handlerHover = (value) => setHover(value);

	const path = usePathname();
	const active = path === href;

	const activeStyle = active ? styles.active : '';
	const aspectStyle = selectStyle(aspect, styles);
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<li
			className={`${styles.tab} theme-${appliedTheme} ${activeStyle} ${aspectStyle}`}
			onMouseEnter={() => handlerHover(true)}
			onMouseLeave={() => handlerHover(false)}
			onClick={handler}
		>
			<Link
				className={styles.tab_link}
				href={`${href}`}
			>
				<div className={styles.tab_symbol}>
					<Badge
						icon={icon}
						symbol={symbol}
						size={size}
						disabled
					/>
				</div>

				{aspect !== STYLE_ENUM.SECOND &&
					<p className={styles.tab_label}>
						{label}
					</p>
				}
			</Link>

			{hover && aspect === STYLE_ENUM.SECOND &&
				<div className={styles.tab_tooltip}>
					<Tooltip
						label={label}
						direction={STYLE_DIR_ENUM.LEFT}
					/>
				</div>
			}
		</li>
	);
	// #endregion
}

export { TabRouter };
