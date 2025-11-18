import { faker } from '@faker-js/faker';
import { colorsApp } from 'lib/utils';
import { helperConvertHexToRGBA } from './helperConvertHexToRGBA';


const _themeSelect = (theme) => theme === 'dark'
	? [
		colorsApp.dark_blue,
		colorsApp.dark_green,
		colorsApp.dark_red,
		colorsApp.dark_orange,
		colorsApp.dark_purple,
		colorsApp.aux_blue,
		colorsApp.aux_purple,
		colorsApp.aux_green,
		colorsApp.aux_orange,
		colorsApp.aux_red,
		colorsApp.aux_green_2,
		colorsApp.aux_jade,
		colorsApp.aux_yellow,
		colorsApp.aux_aqua,
		colorsApp.aux_lemon,
		colorsApp.aux_olive,
		colorsApp.aux_olive,
	]
	: [
		colorsApp.blue,
		colorsApp.green,
		colorsApp.red,
		colorsApp.orange,
		colorsApp.purple,
		colorsApp.aux_blue,
		colorsApp.aux_purple,
		colorsApp.aux_green,
		colorsApp.aux_orange,
		colorsApp.aux_red,
		colorsApp.aux_green_2,
		colorsApp.aux_jade,
		colorsApp.aux_yellow,
		colorsApp.aux_aqua,
		colorsApp.aux_lemon,
		colorsApp.aux_olive,
		colorsApp.aux_olive,
	];


const _themeSelectRGBA = (theme, alpha = 0.5) => theme === 'dark'
	? [
		helperConvertHexToRGBA(colorsApp.dark_blue, alpha),
		helperConvertHexToRGBA(colorsApp.dark_green, alpha),
		helperConvertHexToRGBA(colorsApp.dark_red, alpha),
		helperConvertHexToRGBA(colorsApp.dark_orange, alpha),
		helperConvertHexToRGBA(colorsApp.dark_purple, alpha),
	]
	: [
		helperConvertHexToRGBA(colorsApp.blue, alpha),
		helperConvertHexToRGBA(colorsApp.green, alpha),
		helperConvertHexToRGBA(colorsApp.red, alpha),
		helperConvertHexToRGBA(colorsApp.orange, alpha),
		helperConvertHexToRGBA(colorsApp.purple, alpha),
	];


/**
 * The function `helperCreateDataset` generates a dataset for a chart with customizable theme,
 * transparency, and random data options.
 * @returns The `helperCreateDataset` function returns an object with `labels` and `datasets`
 * properties. The structure of the returned object depends on the input parameters `data`, `theme`,
 * `transparency`, and `random`.
 */
export const helperCreateDataset = ({
	data,
	theme,
	transparency,
	random = false
}) => {
	const colorPalette = transparency ? _themeSelectRGBA(theme) : _themeSelect(theme);

	if (random) {
		const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
		return {
			labels: labels,
			datasets: [
				{
					type: 'line',
					label: 'Dataset 1',
					data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
					backgroundColor: colorPalette[0],
					borderColor: colorPalette[0],
					fill: false,
				},
				{
					type: 'bar',
					label: 'Dataset 2',
					data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
					backgroundColor: colorPalette[1],
					borderColor: colorPalette[1],
					fill: false,
				},
				{
					type: 'bar',
					label: 'Dataset 3',
					data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
					backgroundColor: colorPalette[2],
					borderColor: colorPalette[2],
					fill: false,
				},
			],
		};
	};


	if (data.length !== 0) {
		const newData = data.datasets?.map((item, i) => {
			return {
				type: item.type,
				label: item.label,
				data: item.data,
				backgroundColor: colorPalette[i % colorPalette.length],
				borderColor: colorPalette[i % colorPalette.length],
				borderWidth: 2,
				fill: false,
			}
		});


		return {
			labels: data.labels,
			datasets: newData,
		}
	};
};


/**
 * The function `helperCreateDatasetBubble` generates bubble chart datasets with random or provided
 * data and customizable themes.
 * @returns The `helperCreateDatasetBubble` function returns an object with a `datasets` property. If
 * the `random` parameter is true, it returns an object with two datasets containing randomly generated
 * data points. Each dataset includes an array of objects with `x`, `y`, and `r` properties
 * representing coordinates and radius for a bubble chart. If `random` is false, it processes the
 * provided `
 */
export const helperCreateDatasetBubble = ({
	data,
	random = false,
	theme = ''
}) => {
	const colorPalette = _themeSelect(theme);
	const colorPaletteRGBA = _themeSelectRGBA(theme);

	if (random) {
		return {
			datasets: [
				{
					label: 'Dataset 1',
					data: Array.from({ length: 25 }, () => ({
						x: faker.number.int({ min: -100, max: 100 }),
						y: faker.number.int({ min: -100, max: 100 }),
						r: faker.number.int({ min: 5, max: 20 }),
					})),
					backgroundColor: colorPaletteRGBA[0],
					borderColor: colorPalette[0],
				},
				{
					label: 'Dataset 2',
					data: Array.from({ length: 25 }, () => ({
						x: faker.number.int({ min: -100, max: 100 }),
						y: faker.number.int({ min: -100, max: 100 }),
						r: faker.number.int({ min: 5, max: 20 }),
					})),
					backgroundColor: colorPaletteRGBA[1],
					borderColor: colorPalette[1],
				},
			],
		};
	};


	if (data.length !== 0) {
		const newData = data.datasets?.map((item, i) => {
			return {
				label: item.label,
				data: item.data,
				backgroundColor: colorPaletteRGBA[i % colorPalette.length],
				borderColor: 'transparent',
				borderWidth: 2,
			}
		});


		return {
			datasets: newData,
		}
	};
};


/**
 * The function `helperCreateDatasetScatter` generates scatter plot datasets with customizable themes,
 * transparency, and random data points.
 * @returns The `helperCreateDatasetScatter` function returns an object with a `datasets` property. If
 * the `random` parameter is true, it returns an object with two datasets containing randomly generated
 * data points. If `random` is false, it processes the provided `data` object and returns datasets
 * based on the input data with specified colors and styles.
 */
export const helperCreateDatasetScatter = ({
	data,
	theme,
	transparency,
	random = false,
}) => {
	const colorPalette = transparency ? _themeSelectRGBA(theme) : _themeSelect(theme);

	if (random) {
		return {
			datasets: [
				{
					label: 'Dataset 1',
					data: Array.from({ length: 25 }, () => ({
						x: faker.number.int({ min: -100, max: 100 }),
						y: faker.number.int({ min: -100, max: 100 }),
					})),
					backgroundColor: colorPalette[0],
				},
				{
					label: 'Dataset 2',
					data: Array.from({ length: 25 }, () => ({
						x: faker.number.int({ min: -100, max: 100 }),
						y: faker.number.int({ min: -100, max: 100 }),
					})),
					backgroundColor: colorPalette[1],
				},
			],
		};
	};


	if (data.length !== 0) {
		const newData = data.datasets?.map((item, i) => {
			return {
				label: item.label,
				data: item.data,
				backgroundColor: colorPalette[i % colorPalette.length],
				borderColor: 'transparent',
				borderWidth: 2,
			}
		});

		return {
			datasets: newData,
		}
	};
};



/**
 * The function `helperCreateDatasetRounded` creates a dataset with rounded corners for a chart,
 * allowing for customization of colors and transparency.
 * @returns The `helperCreateDatasetRounded` function returns an object with `labels` and `datasets`
 * properties. The `labels` property contains an array of labels, and the `datasets` property contains
 * an array of dataset objects with properties such as `label`, `data`, `backgroundColor`,
 * `borderColor`, and `borderWidth`.
 */
export const helperCreateDatasetRounded = ({
	data,
	theme,
	transparency,
	random = false,
}) => {
	const colorPalette = transparency ? _themeSelectRGBA(theme) : _themeSelect(theme);

	if (random) {
		const labels = ['January', 'February', 'March'];
		const data = [12, 9, 8];

		return {
			labels: labels,
			datasets: [
				{
					label: 'Numero de votos',
					data: data,
					backgroundColor: colorPalette,
					borderColor: theme === 'dark' ? colorsApp.transparent : colorsApp.white,
					borderWidth: 3,
				}
			],
		};
	};


	if (data.length !== 0) {
		const newData = data.datasets?.map((item) => {
			return {
				label: item.label,
				data: item.data,
				backgroundColor: colorPalette,
				borderColor: theme === 'dark' ? colorsApp.transparent : colorsApp.white,
				borderWidth: 3,
			}
		});


		return {
			labels: data.labels,
			datasets: newData,
		};
	};
};


/**
 * The helperCreateDatasetRadar function creates a radar chart dataset with customizable colors and
 * random data if specified.
 * @returns The `helperCreateDatasetRadar` function returns an object with `labels` and `datasets`
 * properties. If the `random` parameter is true, it returns a specific dataset structure with
 * predefined data for 'Thing 1' to 'Thing 6'. If `random` is false, it processes the provided `data`
 * object to generate a new dataset based on the input data.
 */
export const helperCreateDatasetRadar = ({
	data,
	random = false,
	theme = '',
}) => {
	const colorPalette = _themeSelect(theme);
	const colorPaletteRGBA = _themeSelectRGBA(theme);

	if (random) {
		const labels = ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'];
		const data = [2, 9, 3, 5, 2, 3];
		const data_2 = [4, 5, 4, 2, 3, 4];

		return {
			labels: labels,
			datasets: [
				{
					label: 'Numero de votos',
					data: data,
					backgroundColor: colorPaletteRGBA[0],
					borderColor: colorPalette[0],
					borderWidth: 1,
				},
				{
					label: 'Numero de votos',
					data: data_2,
					backgroundColor: colorPaletteRGBA[1],
					borderColor: colorPalette[1],
					borderWidth: 1,
				}
			],
		};
	};


	if (data.length !== 0) {
		const newData = data.datasets?.map((item, i) => {
			return {
				label: item.label,
				data: item.data,
				backgroundColor: colorPaletteRGBA[i % colorPaletteRGBA.length],
				borderColor: colorPalette[i % colorPalette.length],
				borderWidth: 1,
			}
		});


		return {
			labels: data.labels,
			datasets: newData,
		};
	};
};
