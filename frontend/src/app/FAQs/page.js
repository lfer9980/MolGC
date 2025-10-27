// ESTADO: En desarrollo
'use client';
/* 
	ROUTES - FAQs 
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { WrapScroll } from 'components/__common__';
import { HeadingSubtitle, HeadingTitle } from 'components/atoms';
import { CardTutorial } from 'components/organisms';
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


export default function FAQs({ }) {
	// #region hooks & others
	// #endregion

	//#region main UI
	return (
		<>
			<HeadingTitle
				title='MolGC Web App'
				subtitle='Current Version: 1.0.0 Ambar'
			>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
			</HeadingTitle>

			<div className={styles.page_section}>
				<HeadingSubtitle
					title='Section N'
					label='Tutoriales acerca de ...'
					border
				/>

				<WrapScroll padding margin>
					<CardTutorial
						image='/images/logotipo_bw.png'
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</CardTutorial>

					<CardTutorial
						image='/images/logotipo_bw.png'
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</CardTutorial>

					<CardTutorial
						image='/images/logotipo_bw.png'
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</CardTutorial>
				</WrapScroll>
			</div>

			<div className={styles.page_section}>
				<HeadingSubtitle
					title='Section N'
					label='Tutoriales acerca de ...'
					border
				/>

				<WrapScroll padding margin>
					<CardTutorial
						image='/images/logotipo_bw.png'
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</CardTutorial>

					<CardTutorial
						image='/images/logotipo_bw.png'
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</CardTutorial>

					<CardTutorial
						image='/images/logotipo_bw.png'
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</CardTutorial>
				</WrapScroll>
			</div>

			<hr />
		</>
	);
	//#endregion
};