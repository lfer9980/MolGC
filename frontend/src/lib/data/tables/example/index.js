import { MODELS_TABLE_EXAMPLE } from 'lib/models/tables/example';

export const COLUMNS_EXAMPLE = [
	{
		key: MODELS_TABLE_EXAMPLE.NAME,
		label: 'Nombre del Pokemon',
		symbol: 'flutter_dash',
		align: 'left',
		width: 150,
		sortable: true,
		filterable: false,
	},
	{
		key: MODELS_TABLE_EXAMPLE.URL,
		label: 'URL',
		symbol: 'link',
		align: 'center',
		width: 150,
		sortable: false,
		filterable: false,
	},
];