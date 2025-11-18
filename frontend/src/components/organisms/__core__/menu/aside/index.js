'use client';
/*
	ORGANISMS - MENU ASIDE
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { ButtonPill, HeadingSubtitle } from 'components/atoms';
import { Profile } from 'components/molecules';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
import { STYLE_DIR_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
import { useSemanticLayout } from 'hooks';
import { useMenuContext } from 'context/__core__/menu';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function MenuAside({
	title = '',
	logged = false,
	children,
	theme = ''
}) {
	// #region hooks & others
	const {
		openMenu,
		toggleMenu,
	} = useMenuContext();

	const {
		actions,
		content,
		input,
		subcontent,
	} = useSemanticLayout({
		components: children,
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
		<aside className={styles.aside_wrap}>
			{actions &&
				<div className={styles.aside_navigator}>
					{actions}
				</div>
			}

			{(content && openMenu) &&
				<div className={`${styles.aside} theme-${appliedTheme} animate__animated animate__zoomInUp`}>
					<div className={styles.aside_title}>
						{title &&
							<HeadingSubtitle
								title={title?.toUpperCase()}
							/>
						}

						<div className={styles.aside_button_aux}>
							<ButtonPill
								symbol={openMenu ? 'left_panel_close' : 'left_panel_open'}
								color={colorsApp.transparent}
								handler={toggleMenu}
								size={24}
								padding={1}
							/>
						</div>
					</div>

					{input &&
						<div className={styles.aside_search}>
							{input}
						</div>
					}

					<div className={styles.aside_scroll}>
						{content}
					</div>

					<div className={styles.aside_second}>
						{subcontent && subcontent}

						{/* IF YOU HAVE USERS, ADD HERE AUTH OR SESSION VALIDATIONS */}
						{logged &&
							<div className={styles.aside_profile}>
								<Profile
									size={32}
									username='USERNAME'
									direction={STYLE_DIR_ENUM.TOP}
								/>
							</div>
						}
					</div>
				</div>
			}

			{content &&
				<div className={styles.aside_button}>
					<ButtonPill
						symbol='menu'
						color={openMenu ? colorsApp.transparent : colorsApp.blue}
						handler={toggleMenu}
						padding={6}
					/>
				</div>
			}
		</aside>
	);
	// #endregion
}

export { MenuAside };
