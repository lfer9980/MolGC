'use client';
/* 
	MOLECULES - LIST DROPDOWN
*/
// #region libraries
import React, { useRef, useState } from 'react';
// #endregion


// #region components
import { Badge } from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
import { selectDirStyle, STYLE_DIR_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
import { useClickOutside } from 'hooks';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function ListDropdown({
	title = '',
	subtitle = '',
	label = '',
	icon,
	symbol = '',
	color = colorsApp.blue,
	direction = STYLE_DIR_ENUM.BOTTOM,
	children,
	theme = ''
}) {
	// #region hooks & others
	const ref = useRef(null);

	const [opened, setOpened] = useState(false);
	const handlerToggleDropdown = () => setOpened(!opened);

	useClickOutside({
		ref: ref,
		handler: () => setOpened(false),
		enabled: opened,
	});

	const directionStyle = selectDirStyle(styles, direction);
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<div
			ref={ref}
			className={`${styles.list} theme-${appliedTheme}`}
		>
			<div
				className={styles.list_summary}
				onClick={handlerToggleDropdown}
			>
				{(icon || symbol) &&
					<Badge
						icon={icon}
						symbol={symbol}
						size={24}
						color={color}
						pill
					/>
				}

				<div className={styles.list_summary_main}>
					<p className={styles.list_title}>
						{title}
					</p>

					<p className={styles.list_subtitle}>
						{subtitle}
					</p>
				</div>

				<div className={styles.list_symbol}>
					<span className='material-symbols-outlined'>
						{opened ? 'unfold_less' : 'unfold_more'}
					</span>
				</div>
			</div>


			{opened &&
				<div className={`${styles.list_main} ${directionStyle}`}>
					{label || children}
				</div>
			}
		</div>
	);
	// #endregion
}

export { ListDropdown };