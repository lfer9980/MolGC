// ESTADO: Completada
'use client';
/*
	ROUTES - RESUME
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { WrapScroll } from 'components/__common__';
import {
	ButtonColor,
	ButtonPrimary,
	HeadingSubtitle,
	HeadingTitle,
	Loader,
	LOADER_ENUM,
} from 'components/atoms';

import {
	Breadcrumbs,
	ElementLink,
	More
} from 'components/molecules';

import { CardTable } from 'components/organisms';
// #endregion


// #region assets
import { colorsApp } from 'lib/utils';
// #endregion


// #region utils
// #endregion


// #region hooks
import { useFiles } from './useFiles';
// #endregion


// #region contexts & stores
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


export default function Files({ }) {
	// #region hooks & others
	const {
		router,
		loading,
		resume,
		addMoreVisibility,
		handlerDeleteJob,
	} = useFiles({});
	// #endregion

	//#region main UI
	if (loading) return (
		<div className={styles.page_loading}>
			<Loader
				type={LOADER_ENUM.SPINNER}
				number={7}
				size={64}
				label='cargando...'
			/>
		</div>
	);

	return (
		<>
			<Breadcrumbs />

			<HeadingTitle
				title='Archivos cargados'
				label='Este es el resumen de los archivos que cargaste.'
				symbol='upload'
			/>

			<HeadingSubtitle
				subtitle='Resumen de familias agregadas'
			/>

			<div className={styles.page_main}>
				<WrapScroll margin>
					{resume?.map((item, i) => (
						<CardTable
							key={i}
							title={item.family}
							symbol='biotech'
							color={colorsApp.background_second}
							elements={item.variants}
						/>
					))}
				</WrapScroll>
			</div>

			{addMoreVisibility &&
				<More
					label='Agregar nuevo'
					handler={() => router.push('/files/manual')}
				/>
			}

			<div className={styles.page_link}>
				<ElementLink
					href='/docs'
					label='Documentación y tutoriales de uso'
					symbol='help'
				/>
			</div>

			<div className={styles.page_actions}>
				<ButtonPrimary
					symbol='not_started'
					label='Continuar'
					handler={() => router.push('/configuration')}
				/>

				<ButtonColor
					label='Cancelar operación'
					color={colorsApp.dark_red}
					symbol='cancel'
					handler={handlerDeleteJob}
					outline
					center
				/>
			</div>
		</>
	);
	//#endregion
};
