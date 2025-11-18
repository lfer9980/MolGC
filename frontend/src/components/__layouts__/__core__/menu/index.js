'use client';
/*
	LAYOUTS - CORE - MENU
*/

// #region libraries
import React from 'react';
// #endregion


// #region components
import {
	WrapMain,
	WrapScroll,
	WRAP_MAIN_DIRECTION,
	SemActions,
	SemInput,
	SemContent,
	SemSubcontent,
} from 'components/__common__';

import { ButtonPill, InputText } from 'components/atoms';
import { Breadcrumbs } from 'components/molecules';

import {
	MenuAside,
	MenuNav,
	NavigatorHorizontal,
	NavigatorVertical,
	MenuItem,
} from 'components/organisms';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
// #endregion


// #region hooks
import { useMenu } from './useMenu';
// #endregion


// #region context & stores
import { useMenuContext } from 'context/__core__';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useScreenSize } from 'hooks/__core__';
// #endregion


function MenuLayout({
	title = 'Menu',
	elements = [],
	subelements = [],
	navigation = [],
	children,
}) {
	// #region hooks & others
	const {
		openMenu,
		toggleMenu,
	} = useMenuContext();

	const {
		search,
		results,
		handleSearch,
	} = useMenu({
		elements: elements,
	});


	const {
		screenMatch
	} = useScreenSize({
		screen: ['mobile', 'tablet']
	});


	const showData = elements.length > 0;
	// #endregion


	// #region theme
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<WrapMain direction={WRAP_MAIN_DIRECTION.ROW}>
			<MenuAside title={title} logged>
				<SemActions>
					<NavigatorVertical
						elements={navigation}
						handler={() => toggleMenu(false)}
					/>
				</SemActions>

				<SemInput>
					<InputText
						symbol='search'
						placeholder='busqueda de componentes'
						value={search}
						handler={handleSearch}
					/>
				</SemInput>

				{showData &&
					<SemContent>
						{results.length > 0 ?
							<>
								<p className={styles.menu_label}>
									Resultados de busqueda
								</p>
								{results.map((item, i) => (
									<MenuItem
										key={i}
										data={item}
										basePath=''
										handler={() => screenMatch && toggleMenu(false)}
									/>
								))}
							</>
							:
							<MenuNav elements={elements} />
						}
					</SemContent>
				}

				<SemSubcontent>
					<MenuNav elements={subelements} />
				</SemSubcontent>
			</MenuAside>

			<div className={styles.menu}>
				<div className={styles.menu_bread}>
					{showData &&
						<div className={styles.menu_bread_button}>
							<ButtonPill
								symbol={openMenu ? 'left_panel_close' : 'left_panel_open'}
								color={colorsApp.transparent}
								handler={toggleMenu}
								size={24}
								padding={1}
							/>
						</div>
					}

					<Breadcrumbs />
				</div>

				<WrapScroll padding>
					{children}
				</WrapScroll>
			</div>

			<div className={styles.menu_navigation}>
				<NavigatorHorizontal
					elements={navigation}
					fixed
				/>
			</div>
		</WrapMain>
	);
	// #endregion
}

export { MenuLayout };
