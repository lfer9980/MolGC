import { MENU_ASIDE_STYLE } from 'lib/helpers';

/* TODO: add internacionalizacion */
/* template base para estructurar menus laterales de navegacion */
export const MENU_EXAMPLE = [
	{
		title: 'Ejemplo de menu',
		basePath: '',
		elements: [
			{
				type: MENU_ASIDE_STYLE.FIRST,
				subtitle: 'Seccion tutoriales 1',
				references: [
					{
						label: 'Tutorial 1',
						href: '#Tutorial 1'
					},
				],
			},
			{
				type: MENU_ASIDE_STYLE.SECOND,
				subtitle: 'Seccion tutorial 1',
				references: [
					{
						label: 'SubTutorial 2',
						href: '#SubTutorial 2'
					},
				],
			},
			{
				type: MENU_ASIDE_STYLE.THIRD,
				subtitle: 'Seccion subtutorial 2',
				references: [
					{
						label: 'SubTutorial 3',
						href: '#SubTutorial 3'
					},
				],
			},
		],
	},
];


export const MENU_DROPDOWN_EXAMPLE = [
	{
		label: 'Abrir modal de DELETE',
		symbol: 'delete',
		href: '/',
		name: 'option_1',
		modal: true,
	},
	{
		label: 'Abrir modal de INFO',
		symbol: 'info',
		name: 'option_2',
		modal: true,
	},
	{
		label: 'Dirigir a un endpoint',
		href: '/',
		symbol: 'arrow_forward',
		name: 'option_3',
		modal: false,
	},
];