// ESTADO: Completada
'use client';
/* 
	ROUTES - ABOUT 
*/
// #region libraries
import React from 'react';
import { useRouter } from 'next/navigation';
// #endregion


// #region components
import {
	SemContent,
	WrapMain,
} from 'components/__common__';

import { ButtonPrimary, HeadingTitle } from 'components/atoms';
import { ElementImage, More } from 'components/molecules';
import {
	CardAutor,
	Carrousel,
	FooterMolGC,
	HeaderMolGC,
	VideoBackground
} from 'components/organisms';
// #endregion


// #region assets
// #endregion


// #region utils
import config from 'config';
// #endregion


// #region hooks
import { useActivateAnimation } from 'hooks/';
// #endregion


// #region contexts & stores
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


export default function About({ }) {
	// #region hooks & others
	const router = useRouter();

	const {
		animationBase,
		animation
	} = useActivateAnimation({
		animationName: 'animate__flash',
		interval: 4000,
	});
	// #endregion

	//#region main UI
	return (
		<>
			<HeaderMolGC second semiTransparent />

			<VideoBackground>
				<div className={styles.page_hero_wrapper}>
					<div className={styles.page_hero}>

						<h2 className={styles.page_hero_title}>
							MolGC
						</h2>

						<HeadingTitle
							title='Web App'
							subtitle={`Version: ${config?.version}`}
						>
							Molecular Geometry Comparator Algorithm for Bond Length Mean Absolute Error Computation on Molecules
						</HeadingTitle>

						<div className={styles.page_hero_actions}>
							<ButtonPrimary
								symbol='docs'
								label='Tutoriales de uso'
								handler={() => router.push('/docs')}
							/>
						</div>


						<div className={`${styles.page_hero_more} ${animationBase} ${animation}`}>
							<More
								symbol='arrow_downward_alt'
								line={false}
								help
							/>
						</div>
					</div>
				</div>
			</VideoBackground >

			<WrapMain padding >
				<div className={styles.page_wrapper}>
					<article className={styles.page_main}>
						<HeadingTitle
							title='This paper is currently under review'
							accent
						>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							<hr />
						</HeadingTitle>


						<HeadingTitle
							title='Descripcion del proyecto'
						>
							This repository hosts a collection of molecular geometry files generated using Density Functional Theory (DFT) or ab-initio methods. These files will be used for comparative analysis of mean absolute bond lengths. Additionally, the repository includes the executable file (.exe) for the MolGC software.
						</HeadingTitle>

						<ElementImage
							image='/images/article/reference_1.png'
							height={200}
							label='Figura 1: MolGC General Layout'
						/>

						<ElementImage
							image='/images/article/reference_2.png'
							height={200}
							label='Figura 2: MolGC General Flow'
						/>
						<hr />
					</article>

					<div className={styles.page_carrousel}>
						<HeadingTitle
							symbol='people_alt'
							title='Personas detras de MolGC'
						>
							Estas son las personas detrás del proyecto de MolGC y su implementación como plataforma web.
						</HeadingTitle>

						<Carrousel>
							<SemContent>
								<CardAutor
									image='/images/article/javier-camarillo.jpg'
									name='Javier Camarillo Cisneros'
									position='Lider General'
									brief='Fisicoquímica Computacional Labs | UACH'
								/>

								<CardAutor
									image='/images/article/abimael-guzman.jpg'
									name='Abimael Guzmán Pando'
									position='Investigador Principal'
									brief='Fisicoquímica Computacional Labs | UACH'
								/>

								<CardAutor
									image='/images/article/graciela-ramirez.jpg'
									name='Graciela Ramirez Alonso'
									position='Investigador Principal'
									brief='Facultad de ingeniería | UACH'
								/>

								<CardAutor
									image='/images/article/angel-fernandez.jpg'
									name='Angel Fernandez'
									position='Software Developer'
									brief='Fullstack web developer'
								/>
							</SemContent>
						</Carrousel>
					</div>

				</div >
			</WrapMain >

			<FooterMolGC />
		</>
	);
	//#endregion
};