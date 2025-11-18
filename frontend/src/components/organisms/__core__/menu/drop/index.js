'use client';
/*
	ORGANISMS - MENU DROP
*/
// #region libraries
import React from 'react';
import Link from 'next/link';
// #endregion


// #region components
import { ButtonNew } from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
import { THEME_ENUM } from 'context/__core__/theme/__data__';
import { selectDirStyle, STYLE_DIR_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
import { useClickOutside } from 'hooks';
import { useMenuDropdown } from './useMenuDrop';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function MenuDropdown({
	elements = [{ label: '', name: '', modal: false }],
	modalElements = {},
	baseUrl = '',
	open,
	handler,
	handlerClose,
	direction = STYLE_DIR_ENUM.TOP,
	fixed = false,
	button = false,
	theme = ''
}) {
	// #region hooks & others
	const {
		menuRef,
		inOpen,
		openModal,
		toggleMenu,
		handlerOpenModal,
		handlerCloseModal,
	} = useMenuDropdown({
		open: open,
		handlerClose: handlerClose,
	});


	useClickOutside({
		ref: menuRef,
		handler: () => toggleMenu(false),
		enabled: open || inOpen,
	});


	const fixedStyle = fixed ? styles.fixed : '';
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
		<>
			{/* Modal Manager */}
			{openModal !== null && modalElements[openModal] &&
				modalElements[openModal]({ close: handlerCloseModal })
			}

			<div
				ref={menuRef}
				className={`${styles.menu} theme-${appliedTheme} ${fixedStyle}`}
			>
				{(open || inOpen) &&
					<nav className={`${styles.menu_main} ${directionStyle}`}>
						<ul className={styles.menu_list}>
							{elements?.map((item) => (
								<li key={item?.name}>
									{item?.symbol &&
										<span className='material-symbols-outlined'>
											{item.symbol}
										</span>
									}

									{item?.modal ?
										<p
											className={styles.menu_item}
											onClick={() => {
												toggleMenu();
												handlerOpenModal(item?.name)
											}}
										>
											{item?.label}
										</p>
										:
										<>
											{item?.href ?
												<Link
													href={`${baseUrl}${item?.href}`}
													className={styles.menu_item}
													onClick={toggleMenu}
												>
													{item?.label}
												</Link>
												:
												<p
													className={styles.menu_item}
													onClick={() => {
														toggleMenu();
														handler && handler();
													}}
												>
													{item?.label}
												</p>
											}
										</>
									}
								</li>
							))}
						</ul>
					</nav>
				}


				{button &&
					<ButtonNew
						color={appliedTheme === THEME_ENUM.DARK ? colorsApp.dark_blue : colorsApp.blue}
						symbol='add'
						handler={toggleMenu}
						active={inOpen || open}
					/>
				}
			</div>
		</>
	);
	// #endregion
}

export { MenuDropdown };
