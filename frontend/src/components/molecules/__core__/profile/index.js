'use client';
/*
	MOLECULES - PROFILE
*/
// #region libraries
import React from 'react';
import { useRouter } from 'next/navigation';
// #endregion


// #region components
import {
	Avatar,
	BadgeDropdown,
	ButtonColor
} from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
import { THEME_OPTIONS } from 'context/__core__/theme/__data__';
import { selectDirStyle, STYLE_DIR_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
import { useProfile } from './useProfile';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function Profile({
	username = 'username',
	image = '',
	size = 24,
	basePath = '',
	direction = STYLE_DIR_ENUM.BOTTOM,
	inverse = false,
	theme = ''
}) {
	// #region hooks & others
	const router = useRouter();

	const {
		ref,
		opened,
		selectedTheme,
		handlerSelectedTheme,
		handlerToggleDropdown,
	} = useProfile({});

	const inverseStyle = inverse ? styles.white : '';
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
			className={`${styles.profile} theme-${appliedTheme}`}
		>
			<div
				className={`${styles.profile_main} ${inverseStyle}`}
				onClick={handlerToggleDropdown}
			>
				<Avatar
					image={image}
					size={size}
				/>

				<p className={styles.profile_label}>
					{username}
				</p>
			</div>

			{opened &&
				<div className={`${styles.profile_menu} ${directionStyle}`}>
					<ButtonColor
						label={'Cuenta'}
						symbol={'account_circle'}
						handler={() => router.push(`${basePath}/account`)}
					/>

					<ButtonColor
						label={'configuracion'}
						symbol={'settings'}
						handler={() => alert('hola mundo')}
					/>

					<BadgeDropdown
						value={selectedTheme}
						width={'100%'}
						handler={(value) => handlerSelectedTheme(value)}
						options={THEME_OPTIONS}
						direction={direction === 'TOP' ? STYLE_DIR_ENUM.TOP : STYLE_DIR_ENUM.LEFT}
					/>

					<ButtonColor
						label={'Cerrar sesión'}
						symbol={'logout'}
						handler={() => router.push(`${basePath}/logout`)}
					/>
				</div>
			}
		</div>
	);
	// #endregion
}

export { Profile };
