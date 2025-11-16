'use client';
/* 
	ORGANISMS - FOOTER X
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { FooterX } from '../__core__';
import {
	SemFooter,
	SemHeader,
	SemSubcontent
} from 'components/__common__';

import { HeadingTitle } from 'components/atoms';

import {
	ElementImage,
	List,
	ListSocial
} from 'components/molecules';
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
						Lorem ipsum dolor sit amet consectetur. Ac euismod lorem aliquet nec vivamus sit nulla lectus. Ullamcorper urna semper aliquet aliquam. Ac nulla nec justo tellus. Gravida et ultrices ut molestie sit.
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
						href='/FAQs'
					/>
				</div>

				<div className={styles.footer_media}>
					<ListSocial
						elements={[
							{
								'name': 'linkedin',
								'href': 'linkedin.com/lfer9980'
							},
							{
								'name': 'facebook',
								'href': 'facebook.com/lfer9980'
							},
						]}
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