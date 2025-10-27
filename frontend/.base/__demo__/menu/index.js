import { MENU_ASIDE_STYLE } from 'lib/helpers';

/* template base para estructurar menus laterales de navegacion */
export const MENU_GENERAL_EXAMPLE = [
	{
		title: 'titulo de la seccion del menu',
		basePath: '/home',
		elements: [
			{
				type: MENU_ASIDE_STYLE.FIRST,
				subtitle: 'nombre de la seccion',
				references: [
					{
						id: 'id',
						label: 'titulo de la seccion del menu',
						href: '/developers',
					},
				],
			},
			{
				type: MENU_ASIDE_STYLE.SECOND,
				subtitle: '',
				references: [
					{
						id: 'id',
						label: 'titulo de la seccion del menu',
						href: '/developers',
					},
				],
			},
			{
				type: MENU_ASIDE_STYLE.THIRD,
				subtitle: '',
				references: [
					{
						id: 'id',
						label: 'titulo de la seccion del menu',
						href: '/developers',
					},
				],
			},
		],
	},
	{
		title: 'titulo de la seccion del menu',
		basePath: '',
		elements: [
			{
				type: MENU_ASIDE_STYLE.FIRST,
				subtitle: 'nombre de la seccion',
				references: [
					{
						id: 'id',
						label: 'titulo de la seccion del menu',
						href: '/developers',
					},
					{
						id: 'id',
						label: 'titulo de la seccion del menu',
						href: '/developers',
					},
					{
						id: 'id',
						label: 'titulo de la seccion del menu',
						href: '/developers',
					},
					{
						id: 'id',
						label: 'titulo de la seccion del menu',
						href: '/developers',
					},
				],
			},
			{
				type: MENU_ASIDE_STYLE.FIRST,
				subtitle: 'nombre de la seccion',
				references: [
					{
						id: 'id',
						label: 'titulo de la seccion del menu',
						href: '/developers',
					},
					{
						id: 'id',
						label: 'titulo de la seccion del menu',
						href: '/developers',
					},
					{
						id: 'id',
						label: 'titulo de la seccion del menu',
						href: '/developers',
					},
					{
						id: 'id',
						label: 'titulo de la seccion del menu',
						href: '/developers',
					},
				],
			},
		],
	},
];


export const MENU_SUB_GENERAL_EXAMPLE = [
	{
		title: '',
		basePath: '/home',
		elements: [
			{
				type: MENU_ASIDE_STYLE.FIRST,
				subtitle: 'nombre de la seccion',
				references: [
					{
						label: 'Dashboards',
						href: '/developers',
					},
					{
						label: 'Documents',
						href: '/developers',
					},
				],
			},
		],
	},
];