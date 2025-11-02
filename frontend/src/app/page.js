// ESTADO: En desarrollo
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
	LOADER_ENUM
} from 'components/atoms';

import {
	ElementImage,
	ElementLabel,
	ElementLink,
	More
} from 'components/molecules';

import { HeaderMolGC, VideoBackground } from 'components/organisms';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
// #endregion


// #region hooks
import { useWelcome } from './useWelcome';
// #endregion


// #region contexts & stores
import { useServiceCreateJob } from 'services/job';
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion



export default function App() {
	// #region hooks & others
	const {
		view,
		handlerRedirect,
	} = useWelcome({});

	const {
		loading,
		handlerCreateJob,
	} = useServiceCreateJob();


	// #endregion

	// #region skeletons
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
								label='Descubre como funciona el algoritmo'
								href='/about'
								color={colorsApp.red}
								center
							/>
						</div>

						<div className={styles.page_hero_more}>
							<More
								label='Desliza para comenzar'
								symbol='arrow_downward_alt'
								line={false}
								help
							/>
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
							<WrapSection padding>
								<HeadingTitle
									symbol='precision_manufacturing'
									title='Modo de uso'
									subtitle='Manual / Automatico'
									label='MolGC puede leer tus archivos de forma automatica, pero si lo prefieres, puedes cargar tus archivos y categorizarlos de forma manual.'
									theme='dark'
								/>

								<div className={styles.page_select}>
									{loading ?
										<div className={styles.page_select_loading}>
											<Loader
												type={LOADER_ENUM.DOTS}
												number={29}
												size={32}
												label='cargando'
											/>
										</div>
										:
										<>
											<div className={styles.page_select_panel}>
												<ButtonColor
													label='Subir archivos Automaticamente'
													symbol='backup'
													color={colorsApp.blue}
													size={24}
													center
													handler={() => handlerCreateJob({ uploadType: "automatic", handler: handlerRedirect })}
												/>
												<ButtonColor
													label='Subir archivos Manualmente'
													symbol='upload'
													color={colorsApp.green}
													center
													handler={() => handlerCreateJob({ uploadType: "manual", handler: handlerRedirect })}
													size={24}
												/>
											</div>

											<hr />

											<div className={styles.page_select_second}>
												<ElementLabel
													title='MolGC en accion'
													label='Juega con MolGC, con un archivo de prueba que tenemos preparado.'
												/>

												<ButtonColor
													label='Prueba MolGC'
													symbol='play_arrow'
													color={colorsApp.dark_purple}
													center
													outline
													size={24}
												/>
											</div>
										</>
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
						href='/FAQs'
						label='Documentacion y tutoriales de uso'
						symbol='help'
					/>
				</div>
			}
		</>
	);
	//#endregion
};