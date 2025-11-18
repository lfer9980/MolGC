'use client';
/*
	ORGANISMS - MENU NAVIGATE SECTION
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { MenuItem } from '../item';
import { HeadingSubtitle } from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
import { selectMenuStyle } from 'lib/helpers';
// #endregion


// #region hooks
import { useMenuContext } from 'context/__core__';
// #endregion


// #region styles
import styles from '../styles.module.scss';
import { useThemeStore } from 'context/__core__';
import { useScreenSize } from 'hooks/__core__';
// #endregion


function MenuSection({
	title = '',
	label = '',
	basePath = '/',
	elements = [],
	theme = ''
}) {
	// #region hooks & othersnpm
	const {
		toggleMenu,
	} = useMenuContext();


	const {
		screenMatch
	} = useScreenSize({
		screen: ['mobile', 'tablet']
	});
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.section} theme-${appliedTheme}`}>
			{title &&
				<HeadingSubtitle
					subtitle={title}
					label={label}
				/>
			}

			{elements?.map((item, i) => {
				const menuStyle = selectMenuStyle(item.type, styles);

				return (
					<div
						key={i}
						className={`${styles.section_element} ${menuStyle}`}
					>
						{item.subtitle &&
							<p className={styles.section_subtitle}>
								{item.subtitle}
							</p>
						}

						<nav className={styles.section_nav}>
							<ul>
								{item.references?.map((element, i) => (
									<MenuItem
										key={i}
										data={element}
										handler={() => screenMatch && toggleMenu(false)}
										basePath={basePath}
										type={item.type}
									/>
								))}
							</ul>
						</nav>
					</div>
				);
			})}
		</div>
	);
	// #endregion
}

export { MenuSection };
