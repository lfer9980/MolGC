'use client';
/*
	ORGANISMS - FOOTER X
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import {
	SemFooter,
	SemHeader,
	SemSubcontent
} from 'components/__common__';

import { HeadingTitle } from 'components/atoms';
import { ElementImage, List } from 'components/molecules';
import { FooterX } from 'components/organisms';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context';
// #endregion


function FooterMolGC({ theme = '' }) {
	// #region hooks & others
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<FooterX
			color={colorsApp.black}
			theme={appliedTheme}
		>
			<SemHeader>
				<div className={styles.footer_header}>
					<ElementImage
						image='/images/logotipo_bw.png'
						width={150}
						height={56}
					/>
					<ElementImage
						image='/images/logotipo_uach_bw.png'
						width={60}
						height={60}
					/>
				</div>

				<div className={styles.footer_title}>
					<HeadingTitle
						title='MolGC Web App'
					>
						Molecular Geometry Comparator Algorithm for Bond Length Mean Absolute Error Computation on Molecules
					</HeadingTitle>

					<hr />
				</div>
			</SemHeader>


			<SemSubcontent>
				<div className={styles.footer_main}>
					<HeadingTitle
						subtitle='Índice general'
					/>

					<List
						title='Servicio'
						href='/'
					/>

					<List
						title='Sobre Nosotros'
						href='/about'
					/>

					<List
						title='Tutoriales y modos de uso'
						href='https://molgc.eonia.io/docs/'
					/>
				</div>
			</SemSubcontent>


			<SemFooter>
				<p className={styles.footer_love}>
					Hecho con <span>❤️</span> para los profesionales de Latinoamérica
				</p>
			</SemFooter>
		</FooterX>
	);
	// #endregion
}

export { FooterMolGC };
