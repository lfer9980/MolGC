'use client';
/*
	ORGANISMS - FORM LOGIN
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import {
	ButtonPrimary,
	HeadingTitle,
	InputLogin,
} from 'components/atoms';

import { ElementLabel } from 'components/molecules';
// #endregion


// #region assets
import config from 'config';
// #endregion


// #region utils
import { STYLE_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
import { useServiceAuth } from 'services/auth';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function FormLogin({
	label = '',
	href = '',
	endpoint = '',
	border = false,
	alternatives = false,
	sso = false,
	theme = ''
}) {
	// #region hooks & others
	const {
		loading,
		handlerRequestPost,
	} = useServiceAuth({});


	const borderStyle = border ? styles.border : '';
	// #endregion

	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<form
			className={`${styles.form} theme-${appliedTheme} ${borderStyle}`}
			onSubmit={(event) => {
				event.preventDefault();

				!loading && handlerRequestPost({
					event: event,
					endpoint: endpoint
				});
			}}
		>
			<div className={styles.form_title}>
				<HeadingTitle
					heading={'Inicia sesión'}
					label={`Accede a la plataforma ${config.appName} (Beta).`}
				/>

				<ElementLabel
					aspect={STYLE_ENUM.SECOND}
					title='No tienes una cuenta?'
					label='crear cuenta'
					href={href || '/sign'}
				/>
			</div>

			<div className={styles.form_main}>
				<InputLogin
					name='username'
					symbol='person'
					placeholder='@usuario'
					isVisible
				/>

				<InputLogin
					name='password'
					placeholder='contrasena'
					symbol='key'
					visible
				/>
			</div>

			<div className={styles.form_actions}>
				<ButtonPrimary
					label='Iniciar sesión'
					type='submit'
					loading={loading}
				/>

				{sso &&
					<ButtonPrimary
						aspect={STYLE_ENUM.SECOND}
						symbol='laptop_windows'
						label='SSO con Windows Auth'
						handler={() => alert('ups, esto aun no se implementa')}
					/>
				}

				{alternatives &&
					<div className={styles.form_actions_more}>
						<div className={styles.form_actions_divisor}>
							<div className={styles.divisor} />
							OR
							<div className={styles.divisor} />
						</div>

						<ButtonPrimary
							icon='/icons/login/google.svg'
							label='Inicia sesion con Google'
							aspect={STYLE_ENUM.SECOND}
							handler={() => alert('ups, esto aun no se implementa')}
							arrow
						/>

						<ButtonPrimary
							icon='/icons/login/microsoft.svg'
							label='Inicia sesion con Microsoft'
							aspect={STYLE_ENUM.SECOND}
							handler={() => alert('ups, esto aun no se implementa')}
							arrow
						/>

						<ButtonPrimary
							icon='/icons/login/apple.svg'
							label='Inicia sesion con Apple'
							aspect={STYLE_ENUM.SECOND}
							handler={() => alert('ups, esto aun no se implementa')}
							arrow
						/>

						<ButtonPrimary
							icon='/icons/login/linkedin.svg'
							label='Inicia sesion con Linkedin'
							aspect={STYLE_ENUM.SECOND}
							handler={() => alert('ups, esto aun no se implementa')}
							arrow
						/>
					</div>
				}
			</div>

			<div className={styles.form_help}>
				<ElementLabel
					aspect={STYLE_ENUM.THIRD}
					label={label || 'Terms of use'}
					href={href || '/terms'}
				/>

				|

				<ElementLabel
					label='Privacy Policy'
					aspect={STYLE_ENUM.SECOND}
					href={href || '/privacy'}
				/>
			</div>
		</form>
	);
	// #endregion
}

export { FormLogin };
