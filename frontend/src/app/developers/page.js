'use client';
/*
	ROUTES - DEVELOPERS
*/

// #region libraries
import React from 'react';
// #endregion


// #region components
import {
	SemContent,
	SemHeader,
	WrapMain,
	WrapSection
} from 'components/__common__';

import { HeadingTitle } from 'components/atoms';
import { ElementLabel } from 'components/molecules';
import {
	ChartPie,
	ChartWrap,
	DockerCategories,
	DockerFilter,
	RowsProgress,
	TableX
} from 'components/organisms';
// #endregion


// #region assets
import PROGRESO_DEV_FRONTEND from 'lib/__core__/JSON/progress.json';
import { MODELS_TABLES_PROGRESO } from 'lib/models/tables/progress';
// #endregion


// #region utils
import { COLUMNS_PROGRESO_FRONTEND } from 'lib/data/tables/progress';
// #endregion


// #region hooks
import { useFilter } from 'hooks';
// #endregion


// #region contexts & stores
import { useLocale } from 'context/__core__';
// #endregion


// #region styles
// #endregion


export default function Developers({ }) {
	// #region hooks & others
	const {
		t,
	} = useLocale();

	const categories = Object.values(MODELS_TABLES_PROGRESO);

	const {
		filteredData,
		category,
		categoryOptions,
		valueSearched,
		categorySearched,
		handlerCategory,
		handlerValueSearched,
		handlerCategorySearched,
		handlerResetFilters,
	} = useFilter({
		data: PROGRESO_DEV_FRONTEND,
		initialKey: categories[0]
	});


	const _diseno = PROGRESO_DEV_FRONTEND.filter(item => item.estado === 'En diseno').length;
	const _desarrollo = PROGRESO_DEV_FRONTEND.filter(item => item.estado === 'En desarrollo').length;
	const _validacion = PROGRESO_DEV_FRONTEND.filter(item => item.estado === 'En validacion').length;
	const _cambios = PROGRESO_DEV_FRONTEND.filter(item => item.estado === 'Aplicando Cambios').length;
	const _completada = PROGRESO_DEV_FRONTEND.filter(item => item.estado === 'Completada').length;


	const dataset = {
		labels: [
			'En diseno',
			'En desarrollo',
			'En validacion',
			'Aplicando cambios',
			'Completada',
		],
		datasets: [{
			label: 'Conteo',
			data: [_diseno, _desarrollo, _validacion, _cambios, _completada],
		}],
	}

	// #endregion

	//#region main UI
	return (
		<>
			<HeadingTitle
				title={'Progreso de la aplicacion'}
				label={'Visualiza el progreso completo de la aplicacion'}
			/>

			<WrapMain>
				<WrapSection>
					<DockerFilter
						valueSearched={valueSearched}
						valueCategory={categorySearched}
						handlerSearched={handlerValueSearched}
						handlerSearchedCategory={handlerCategorySearched}
						handlerCategory={handlerCategory}
						options={categories}
					>
						<SemHeader>
							<ElementLabel
								title='Pantallas (total)'
							>
								<h3 style={{ fontWeight: 700 }}>
									{PROGRESO_DEV_FRONTEND.length}
								</h3>
							</ElementLabel>
						</SemHeader>

						<SemContent>
							<ChartWrap
								title='Estado de la aplicacion'
								mini
							>
								<ChartPie data={dataset} />
							</ChartWrap>
						</SemContent>
					</DockerFilter>

					<DockerCategories
						category={category}
						categories={categoryOptions}
						handler={handlerCategory}
						handlerReset={handlerResetFilters}
					/>
				</WrapSection>


				<WrapSection margin>
					<HeadingTitle
						title={'Resumen de pantallas'}
						label={'Tabla resumen de pantallas de la aplicacion MOLGC y su estado de desarrollo actual'}
					/>

					<TableX
						data={filteredData}
						columns={COLUMNS_PROGRESO_FRONTEND}
						theme='dark'
					>
						{(props) => <RowsProgress {...props} />}
					</TableX>
				</WrapSection>
			</WrapMain>
		</>
	);
	//#endregion
}
