// ESTADO: En desarrollo
'use client';
/* 
	ROUTES - ABOUT 
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { SemContent, WrapMain } from 'components/__common__';
import { HeadingTitle } from 'components/atoms';
import { Breadcrumbs, ElementImage } from 'components/molecules';
import {
	CardAutor,
	Carrousel,
	FooterMolGC,
	HeaderMolGC
} from 'components/organisms';
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


export default function About({ }) {
	// #region hooks & others
	// #endregion

	//#region main UI
	return (
		<>
			<HeaderMolGC second />

			<WrapMain margin padding >
				<Breadcrumbs />

				<HeadingTitle
					title='MolGC Web App'
					subtitle='Current Version: 1.0.0 Ambar'
				>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</HeadingTitle>
				<hr />


				<article className={styles.page_main}>
					<HeadingTitle
						title='Descripcion de una caracteristica particular'
						subtitle='SUBTITLE'
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</HeadingTitle>

					<HeadingTitle
						title='Descripcion de una caracteristica particular'
						subtitle='SUBTITLE'
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</HeadingTitle>

					<HeadingTitle
						title='Descripcion de una caracteristica particular'
						subtitle='SUBTITLE'
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</HeadingTitle>

					<HeadingTitle
						title='Descripcion de una caracteristica particular'
						subtitle='SUBTITLE'
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</HeadingTitle>

					<ElementImage
						image='/images/logotipo_bw.png'
						height={200}
						label='Imagen de referencia'
					/>
				</article>
				<hr />

				<article className={styles.page_main}>
					<HeadingTitle
						symbol='people_alt'
						title='Personas detras de MolGC'
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</HeadingTitle>
				</article>
			</WrapMain >

			<Carrousel>
				<SemContent>
					<CardAutor
						image=''
						name='Autor Name'
						position='Position'
						brief='Brief Description about'
					/>

					<CardAutor
						image=''
						name='Autor Name'
						position='Position'
						brief='Brief Description about'
					/>
					<CardAutor
						image=''
						name='Autor Name'
						position='Position'
						brief='Brief Description about'
					/>
				</SemContent>
			</Carrousel>

			<FooterMolGC />
		</>
	);
	//#endregion
};