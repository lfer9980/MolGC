import { MENU_ASIDE_STYLE } from "lib/helpers";
import { MODELS_TABLES_PROGRESO } from "lib/models/tables/progress";

export const DATA_TUTORIAL_EXAMPLE = `
### Milkdown + React + Crepe: Tutorial de Prueba

> **"El mejor editor es el que te deja concentrarte en lo que escribes, no en cómo lo escribes."**

Este es un **tutorial de prueba** para verificar que Milkdown funciona correctamente en una aplicación **React**.  
Aquí verás ejemplos de todos los elementos comunes de Markdown para probar el renderizado.

---

#### 1️⃣ Introducción

Milkdown es un **editor WYSIWYG basado en Markdown** que te permite escribir con una experiencia amigable y extensible.  
Con Crepe, es aún más fácil integrarlo en un proyecto con **React**.

---

### 2️⃣ Requisitos Previos

Antes de comenzar, asegúrate de tener:

- [Node.js](https://nodejs.org/) versión 16 o superior
- Un proyecto de React creado (por ejemplo, con create-react-app o Vite)
- Conocimientos básicos de React y npm/yarn

---

### 3️⃣ Instalación Paso a Paso

Sigue estos pasos para integrar Milkdown con Crepe:

1. **Instalar dependencias**
`;


export const TREE_FILES_STRUCTURE_EXAMPLE = [
	{
		label: 'FLUOROQUINOLES',
		children: [
			{
				label: 'CIPROFLOXACIN',
				children: [
					{
						label: 'CASTEP',
						children: [
							{
								label: 'LDA + OBS',
								children: [
									{
										label: 'geometry.castep'
									}
								],
							}

						],
					},
				],
			},
		],
	},
];


export const TREE_FILES_STRUCTURE = [
	{
		label: 'Familia',
		children: [
			{
				label: 'Variante',
				children: [
					{
						label: 'Funcional',
						children: [
							{
								label: 'Software',
								children: [
									{
										label: 'archivo.ext'
									}
								],
							}

						],
					},
				],
			},
		],
	},
];


export const RESUME_TABLE = {
	ciprofloxacin: '20 archivos',
	enoxacin: '20 archivos',
	esparfloxacin: '15 archivos',
};

export const REPORT_COLUMNS_EXAMPLE = [
	{
		key: MODELS_TABLES_PROGRESO.CATEGORIA,
		label: 'Functional',
		align: 'center',
		width: 90,
		sortable: false,
		filterable: false,
	},
	{
		key: MODELS_TABLES_PROGRESO.PANTALLA,
		label: 'Fluoroquinoles',
		align: 'center',
		width: 90,
		sortable: false,
		filterable: false,
	},
	{
		key: MODELS_TABLES_PROGRESO.URL,
		label: 'Closeness',
		align: 'center',
		width: 90,
		sortable: false,
		filterable: false,
	},
	{
		key: MODELS_TABLES_PROGRESO.ESTADO,
		label: 'Ranking',
		align: 'center',
		width: 90,
		sortable: false,
		filterable: false,
	},
];