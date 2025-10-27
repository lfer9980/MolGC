import { MODELS_TABLES_PROGRESO } from 'lib/models/tables/progress';

/*
STRUCTURE: 
export const COLUMNS_TABLE_EXAMPLE = {
	key: '',
	label: 'label',
	align: 'left',
	width: 150,
	sortable: false,
	filterable: false,
};
*/

export const COLUMNS_PROGRESO_FRONTEND = [
	{
		key: MODELS_TABLES_PROGRESO.CATEGORIA,
		label: 'Categoria',
		align: 'left',
		symbol: 'category',
		width: 200,
		sortable: true,
		filterable: false,
	},
	{
		key: MODELS_TABLES_PROGRESO.PANTALLA,
		label: 'Pantalla',
		align: 'center',
		width: 250,
		sortable: true,
		filterable: true,
	},
	{
		key: MODELS_TABLES_PROGRESO.URL,
		label: 'URLs',
		symbol: 'link',
		align: 'center',
		width: 200,
		sortable: false,
		filterable: false,
	},
	{
		key: MODELS_TABLES_PROGRESO.ESTADO,
		label: 'Estado',
		align: 'center',
		width: 100,
		sortable: true,
		filterable: true,
	},
];