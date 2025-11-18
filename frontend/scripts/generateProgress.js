/*
	Script that generate application development progress automatically

	Output JSON:
	{
		'categoria': 'categoria de la Pantalla',
			'pantalla': 'Nombre de la pantalla',
				'url': '/url',
					'estado': MODELS_PROGRESO_DEV_ESTADO.DESARROLLO,
						'color: '#FFF'
	}
*/

const fs = require('fs');
const path = require('path');
const colors = require('../src/lib/__core__/JSON/colors.json');

const _MODELS_ESTADO = [
	'En diseno',
	'En desarrollo',
	'En validacion',
	'Aplicando cambios',
	'Completada',
];

const _CATEGORIAS = {
	'about': 'Acerca de',
	'analysis': 'Analisis',
	'configuration': 'Configuracion',
	'dashboard': 'Dashboard',
	'FAQs': 'Tutoriales',
	'files': 'Archivos',
	'resume': 'Resumen',
	'report': 'Reportes',
};

const _REGEX = new RegExp(`/*${_MODELS_ESTADO.join('|')}`);

const appDir = path.join(__dirname, '../src/app');
const fileProgress = path.join(__dirname, '../src/lib/__core__/JSON/progress.json');


/**
 * This function reads the content of a file, extracts the first two lines, and returns the first
 * occurrence of a specific pattern after removing single quotes.
 * @param filePath - The `filePath` parameter in the `getStatusFromFile` function is a string that
 * represents the path to the file from which the status needs to be extracted. This function reads the
 * content of the file synchronously using `fs.readFileSync` and then processes the first two lines to
 * extract a status using a regular
 * @returns The function `getStatusFromFile` reads the content of a file specified by `filePath`,
 * extracts the first two lines, and then attempts to match a regular expression stored in `_REGEX`
 * against those lines. If a match is found, it returns the matched value with single quotes removed.
 * If no match is found, it returns 'Desconocido' (Spanish for 'Unknown').
 */
const getStatusFromFile = (filePath) => {
	const content = fs.readFileSync(filePath, 'utf8');
	const firstLines = content.split('\n').slice(0, 2).join('\n');

	const match = firstLines.match(_REGEX);
	return match ? match[0].replace(/'/g, '') : 'Desconocido';
};



/**
 * The function `getColorFromStatus` takes a status input and returns a color based on a predefined set
 * of statuses.
 * @param status - The `getColorFromStatus` function takes a `status` parameter as input. The function
 * then uses a switch statement to determine the color associated with the input status. The color is
 * returned based on the value of the status parameter.
 * @returns The function `getColorFromStatus` returns a color based on the input `status`. The color
 * returned depends on the value of `status` according to the switch cases. If `status` matches one of
 * the cases in `_MODELS_ESTADO`, it will return a specific color from `colorsApp`. If `status` does
 * not match any of the cases, it will return the color `blue
 */
const getColorFromStatus = (status) => {
	switch (status) {
		case _MODELS_ESTADO[0]:
			return colors.palette.black;

		case _MODELS_ESTADO[1]:
			return colors.palette.blue30;

		case _MODELS_ESTADO[2]:
			return colors.palette.purple30;

		case _MODELS_ESTADO[3]:
			return colors.palette.orange30;

		case _MODELS_ESTADO[4]:
			return colors.palette.green30;

		default:
			return colors.palette.red30;
	}
};

/**
 * The function `setDataObject` processes a given base path to determine the screen and category based
 * on certain conditions.
 * @param [basePath] - The `basePath` parameter is a string that represents the base path for a data
 * object. It is used to create a new path by replacing backslashes with forward slashes and extracting
 * the basename from the path.
 * @returns The `setDataObject` function returns an object with three properties: `newPath`, `screen`,
 * and `category`. The values of these properties are determined based on the `basePath` parameter
 * passed to the function. The `newPath` property is the normalized version of the `basePath`, the
 * `screen` property is determined based on the basename of the `newPath`, and the `category`
 */
const setDataObject = (basePath = '') => {
	const cleanedPath = basePath.replace(/[\[\]]/g, '');
	const newPath = '/' + cleanedPath.replace(/\\/g, '/');

	/* this for naming root directory */
	const _basename = path.basename(newPath);
	const screen = _basename === '' ? 'landing - entrypoint' : _basename;

	/* for categorize children screens names into a category */
	const _key = Object.keys(_CATEGORIAS).filter(key => newPath.includes(key));
	if (_key.length != 0) category = _CATEGORIAS[_key];
	else category = 'Sin Categoria';

	return {
		newPath,
		screen,
		category,
	};
};


/**
 * The `scanDirectory` function recursively scans a directory for files matching a specific pattern and
 * extracts data from those files to create an array of objects.
 * @param directory - The `directory` parameter in the `scanDirectory` function represents the path of
 * the directory you want to scan for files and subdirectories. It is the starting point for the
 * recursive scanning process.
 * @param [basePath] - The `basePath` parameter in the `scanDirectory` function represents the base
 * path of the directory being scanned. It is used to keep track of the relative path of the current
 * directory or file being processed within the overall directory structure. This parameter helps in
 * constructing the relative paths of the files and directories encountered
 * @returns The `scanDirectory` function returns an array of objects containing information about files
 * with names matching 'page.js' within the specified directory. Each object includes the category,
 * screen, URL, and status of the file.
 */
const scanDirectory = (directory, basePath = '') => {
	const result = [];

	fs.readdirSync(directory, { withFileTypes: true }).forEach((dirent) => {
		const fullPath = path.join(directory, dirent.name);
		const relativePath = path.join(basePath, dirent.name);

		if (dirent.isDirectory() && dirent.name !== 'developers') {
			result.push(...scanDirectory(fullPath, relativePath));

		}
		else if (dirent.isFile() && (dirent.name.match('page.js'))) {
			const status = getStatusFromFile(fullPath);
			const colorLog = getColorFromStatus(status)

			const {
				newPath,
				screen,
				category,
			} = setDataObject(basePath);

			result.push({
				categoria: category,
				pantalla: screen,
				url: newPath,
				estado: status,
				color: colorLog,
			});
		}
	});

	return result;
};


/**
 * The function `generateProgressReport` scans a directory, saves the progress data to a file in JSON
 * format, and logs the file path.
 */
const generateProgressReport = () => {
	const progressData = scanDirectory(appDir);
	fs.writeFileSync(fileProgress, JSON.stringify(progressData, null, 2));
	console.log(`Progreso de desarrollo guardado en ${fileProgress}`);
};

generateProgressReport();
