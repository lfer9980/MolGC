// ESTADO: Completada
'use client';
/* 
	ROUTES - LANDING PAGE 
*/
// #region libraries
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
// #endregion


// #region components
import { WrapMain, WrapSection } from 'components/__common__';
import {
	ButtonColor,
	HeadingTitle,
	Loader,
	LOADER_ENUM,
	LoaderBar,
	TooltipClose
} from 'components/atoms';

import {
	ElementImage,
	ElementLabel,
	ElementLink,
	More
} from 'components/molecules';

import {
	FooterSimpleMolGC,
	HeaderMolGC,
	VideoBackground
} from 'components/organisms';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
// #endregion


// #region hooks
import { useWelcome } from './useWelcome';
import { useActivateAnimation } from 'hooks';
// #endregion


// #region contexts & stores
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion



export default function App() {
	// #region hooks & others
	const {
		router,
		view,
		isDemo,
		validate,
		loading,
		progress,
		handlerCreateJob,
		handlerStartDemo,
	} = useWelcome({});
	// #endregion

	// #region skeletons
	const {
		animationBase,
		animation
	} = useActivateAnimation({
		animationName: 'animate__flash'
	});
	// #endregion


	//#region main UI
	return (
		<>
			<HeaderMolGC second transparent />
			{view === 0 &&
				<VideoBackground>
					<WrapMain padding>
						<div className={styles.page_hero}>
							<ElementImage
								image='/images/logotipo_bw.png'
								width={340}
								height={100}
							/>

							<p className={styles.page_hero_description}>
								<b>Molecular Geometry Comparator Algorithm </b>
								for Bond Length Mean Absolute Error Computation on Molecules.
							</p>

							<ElementLabel
								label='Descubre cómo funciona el algoritmo'
								href='/about'
								color={colorsApp.red}
								center
							/>
						</div>

						{validate &&
							<div className={styles.page_tooltip}>
								<TooltipClose
									symbol='book'
									label='Resultados'
									color={colorsApp.green}
									handler={() => router.push('/dashboard')}
								/>

								<p className={`${styles.page_title} ${animationBase} ${animation}`}>
									<span className='material-symbols-outlined'>
										keyboard_backspace
									</span>

									Tu ultimo reporte
								</p>
							</div>
						}

						<div className={styles.page_hero_more}>
							<More
								label='Desliza para comenzar'
								symbol='arrow_downward_alt'
								line={false}
								help
							/>
						</div>

						<div className={styles.page_footer}>
							<FooterSimpleMolGC />
						</div>
					</WrapMain>
				</VideoBackground>
			}

			{view === 1 &&
				<div className={styles.page_background}>
					<div className={styles.page_background_image} />
					<AnimatePresence mode="wait">
						<motion.section
							key={view}
							initial={{ y: 50, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: -50, opacity: 0 }}
							transition={{ duration: 0.2, ease: "easeOut" }}
							className={styles.page_section}
						>
							<WrapSection padding margin>
								<HeadingTitle
									symbol='precision_manufacturing'
									title='Modo de uso'
									label='MolGC puede leer tus archivos de forma automática, pero si lo prefieres, puedes cargar tus archivos y categorizarlos de forma manual.'
									theme='dark'
								/>

								<div className={styles.page_select}>
									{loading &&
										<div className={styles.page_select_loading}>
											<Loader
												type={LOADER_ENUM.SPINNER}
												number={7}
												size={64}
												label='cargando...'
											/>
										</div>
									}

									{!loading && !isDemo &&
										<>
											<div className={styles.page_select_wrapper}>
												<HeadingTitle
													title='MolGC en acción'
													label='Elige como subiras tus archivos.'
													accent
												/>

												<div className={styles.page_select_panel}>
													<ButtonColor
														label='Subir archivos automáticamente'
														symbol='backup'
														color={colorsApp.blue}
														size={24}
														center
														handler={() => handlerCreateJob({ uploadType: "automatic" })}
													/>
													<ButtonColor
														label='Subir archivos Manualmente'
														symbol='upload'
														color={colorsApp.green}
														center
														handler={() => handlerCreateJob({ uploadType: "manual" })}
														size={24}
													/>
												</div>
											</div>

											<hr className={styles.page_select_divisor} />

											<div className={styles.page_select_wrapper}>
												<HeadingTitle
													title='Playgrounds'
													label='Juega con MolGC, con un archivo de prueba que tenemos preparado.'
												/>

												<div className={styles.page_select_panel}>
													<ButtonColor
														label='Prueba MolGC'
														symbol='play_arrow'
														color={colorsApp.purple}
														handler={handlerStartDemo}
														center
														size={24}
													/>
												</div>
											</div>
										</>
									}

									{isDemo &&
										<div className={styles.page_loading}>
											<Loader
												type={LOADER_ENUM.SPINNER}
												number={7}
												size={64}

											/>

											<div className={styles.page_loading_bar}>
												<LoaderBar
													progress={progress.progress}
													maxValue={100}
													label='subiendo archivos...'
												/>
											</div>
										</div >
									}
								</div>
							</WrapSection>
						</motion.section>
					</AnimatePresence >
				</div>
			}

			{view === 1 &&
				<div className={styles.page_link}>
					<ElementLink
						href='/docs'
						label='Documentación y tutoriales de uso'
						symbol='help'
					/>
				</div>
			}
		</>
	);
	//#endregion
};