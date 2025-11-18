import { MODELS_TABLES_TOPSIS } from "lib/models/tables/TOPSIS";

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


export const COLUMNS_TOPSIS = [
	{
		key: MODELS_TABLES_TOPSIS.FUNCTIONAL,
		label: 'Functional',
		align: 'center',
		width: 75,
		sortable: false,
		filterable: false,
	},
	{
		key: MODELS_TABLES_TOPSIS.CRITERIA,
		label: 'Criteria',
		align: 'center',
		width: 100,
		sortable: false,
		filterable: false,
	},
	{
		key: MODELS_TABLES_TOPSIS.D_NOT_IDEAL,
		label: 'D NOT IDEAL',
		align: 'center',
		width: 50,
		sortable: false,
		filterable: false,
	},
	{
		key: MODELS_TABLES_TOPSIS.D_IDEAL,
		label: 'D IDEAL',
		align: 'center',
		width: 50,
		sortable: false,
		filterable: false,
	},
	{
		key: MODELS_TABLES_TOPSIS.CLOSENESS,
		label: 'Closeness',
		align: 'center',
		width: 50,
		sortable: false,
		filterable: false,
	},
	{
		key: MODELS_TABLES_TOPSIS.RANKING,
		label: 'Ranking',
		align: 'center',
		width: 50,
		sortable: true,
		filterable: true,
	},
];



export const COLUMNS_TOPSIS_REPORT = [
	{
		key: MODELS_TABLES_TOPSIS.FUNCTIONAL,
		label: 'Functional',
		align: 'center',
		width: 75,
		sortable: false,
		filterable: false,
	},
	{
		key: MODELS_TABLES_TOPSIS.D_NOT_IDEAL,
		label: 'D NOT IDEAL',
		align: 'center',
		width: 50,
		sortable: false,
		filterable: false,
	},
	{
		key: MODELS_TABLES_TOPSIS.D_IDEAL,
		label: 'D IDEAL',
		align: 'center',
		width: 50,
		sortable: false,
		filterable: false,
	},
	{
		key: MODELS_TABLES_TOPSIS.CLOSENESS,
		label: 'Closeness',
		align: 'center',
		width: 50,
		sortable: false,
		filterable: false,
	},
	{
		key: MODELS_TABLES_TOPSIS.RANKING,
		label: 'Ranking',
		align: 'center',
		width: 50,
		sortable: true,
		filterable: true,
	},
];
