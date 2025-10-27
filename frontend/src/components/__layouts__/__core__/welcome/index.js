'use client';
/*
	COMMON - LAYOUT - WELCOME
*/
// #region libraries
import React from 'react';
import Image from 'next/image';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
// #endregion


// #region styles
import styles from './styles.module.scss';
import 'styles/animations/typing.css';
import { useThemeStore } from 'context/__core__';
// #endregion


function WelcomeLayout({
	imagotipo = '',
	logotipo = '',
	label = 'Cargando',
	legend = false,
	full = false,
	theme = ''
}) {
	// #region hooks & others
	const fullStyle = full ? styles.full : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.welcome} ${fullStyle}`}>
			<figure className={styles.welcome_isologo_wrapper}>
				<Image
					className={styles.isologo}
					src={imagotipo ? imagotipo : '/images/welcome/imagotipo.png'}
					alt="Isologo"
					sizes='auto'
					priority
					fill
				/>
			</figure>

			{/* if you want to add a divider beetween two logos, uncomment the following code */}
			{/* <hr className={styles.divider} /> */}

			<figure className={styles.welcome_logotipo_wrapper}>
				<Image
					className={styles.logotipo}
					src={logotipo ? logotipo : '/images/welcome/logotipo.png'}
					alt="Logotipo"
					sizes='auto'
					priority
					fill
				/>
			</figure>


			{legend &&
				<div className={styles.welcome_label_wrap}>
					<p className={`${styles.welcome_label} typing`}>
						{label}
					</p>
				</div>
			}
		</div>
	);
	// #endregion
}

export { WelcomeLayout };