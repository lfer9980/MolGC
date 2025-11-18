'use client';
/*
	ORGANISMS - HEADERX
*/
// #region libraries
import React from 'react';
import Link from 'next/link';
// #endregion


// #region components
import {
	Badge,
	BadgeDropdown,
	ButtonColor,
} from 'components/atoms';

import {
	Profile,
	ElementImage,
} from 'components/molecules';
// #endregion


// #region assets
import { SUPPORTED_LOCALES } from 'lib/__core__/i18n';
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
// #endregion


// #region hooks
import { useHeader } from './useHeader';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useLocale, useThemeStore } from 'context/__core__';
// #endregion


function HeaderX({
	fixed = false,
	logged = false,
	color = '',
	theme = ''
}) {
	// #region hooks & others
	const {
		locale,
		handlerSetLocale,
	} = useLocale();

	const {
		router,
		rootRef,
		formatDate,
	} = useHeader({
		locale: locale
	});

	const fixedStyle = fixed ? styles.fixed : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;

	const colorStyle = color ? color : appliedTheme === 'dark' ? colorsApp.background_second : colorsApp.background_first;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<header className={`${styles.header} theme-${appliedTheme} ${fixedStyle}`}>
			<div
				className={styles.header_main}
				style={{ backgroundColor: colorStyle }}
			>
				<div className={styles.header_symbol}>
					<Link
						href={`/${rootRef}`}
						className={styles.header_logo}
					>
						<ElementImage
							image={'/images/logotipo_bw.png'}
							width={'13rem'}
						/>
					</Link>

					{logged &&
						<div className={styles.header_date}>
							<Badge
								color={colorStyle}
								label={formatDate}
								pill
							/>
						</div>
					}
				</div>

				{logged ?
					<div className={styles.header_options}>
						<BadgeDropdown
							label='dropwdown'
							value={locale}
							handler={handlerSetLocale}
							color={colorsApp.transparent}
							options={SUPPORTED_LOCALES}
							padding={false}
						/>

						<div className={styles.header_profile}>
							<Profile
								size={32}
								username='bienvenido username!'
								inverse
							/>
						</div>
					</div>
					:
					<div className={styles.header_options}>
						<div className={styles.header_logout}>
							<ButtonColor
								label='Iniciar sesion'
								color={colorStyle}
								symbol='login'
								handler={() => router.push('/')}
							/>
						</div>
					</div>
				}
			</div>
		</header>
	);
	// #endregion
}

export { HeaderX };
