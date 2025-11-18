// #region libraries
import { colorsApp } from 'lib/utils';
// #endregion


// #region enums
export const STYLE_ENUM = {
	NONE: '',
	FIRST: 'FIRST',
	SECOND: 'SECOND',
	THIRD: 'THIRD',
	FOURTH: 'FOURTH',
}

export const STYLE_LOG_ENUM = {
	NONE: '',
	INFO: 'info',
	DONE: 'done',
	WARNING: 'warning',
	ERROR: 'error',
	OTHER: 'other',
}

export const STYLE_DIR_ENUM = {
	TOP: 'TOP',
	BOTTOM: 'BOTTOM',
	RIGHT: 'RIGHT',
	LEFT: 'LEFT',
	NONE: '',
};

export const MENU_ASIDE_STYLE = {
	FIRST: 'first level',
	SECOND: 'second level',
	THIRD: 'third level'
};
// #endregion


// #region selectors
/**
 * The function `selectStyle` takes a type and a styles object as parameters and returns a specific
 * style based on the type using a switch statement.
 * @param type - The `type` parameter is used to determine which style to select from the `styles`
 * object based on the value of `type`.
 * @param styles - The `styles` parameter in the `selectStyle` function is an object that contains
 * different style properties for different types. The function takes a `type` parameter and returns
 * the corresponding style property from the `styles` object based on the type provided. If the type is
 * not found in the `STYLE
 * @returns The selectStyle function returns a specific style based on the type provided. If the type
 * matches one of the STYLE_ENUM values (FIRST, SECOND, THIRD, FOURTH), it returns the corresponding
 * style from the styles object. If the type does not match any of the enum values, it returns the
 * default style (styles.first).
 */
export const selectStyle = (type, styles) => {
	switch (type) {
		case STYLE_ENUM.FIRST:
			return styles.first;

		case STYLE_ENUM.SECOND:
			return styles.second;

		case STYLE_ENUM.THIRD:
			return styles.third;

		case STYLE_ENUM.FOURTH:
			return styles.fourth;

		default:
			return styles.first;
	}
};


/**
 * The function `selectLogStyle` takes a type and styles object as parameters and returns a specific
 * style based on the type using a switch statement.
 * @param type - The `type` parameter in the `selectLogStyle` function is used to determine the style
 * of the log message based on the type of log. It is compared against different log type enums such as
 * `INFO`, `DONE`, `WARNING`, `ERROR`, and `NONE` to select the appropriate
 * @param styles - The `styles` parameter in the `selectLogStyle` function is an object that contains
 * different style properties for log messages. These style properties could include CSS classes,
 * inline styles, or any other styling information that can be applied to log messages based on their
 * type (INFO, DONE, WARNING, ERROR
 * @returns The function `selectLogStyle` returns a specific style based on the `type` parameter
 * provided. If the `type` matches one of the predefined log style enums (`INFO`, `DONE`, `WARNING`,
 * `ERROR`, `NONE`), it returns the corresponding style from the `styles` object. If the `type` does
 * not match any of the enums, it defaults to returning the `
 */
export const selectLogStyle = (type, styles) => {
	switch (type) {
		case STYLE_LOG_ENUM.INFO:
			return styles.info;

		case STYLE_LOG_ENUM.DONE:
			return styles.done;

		case STYLE_LOG_ENUM.WARNING:
			return styles.warning;

		case STYLE_LOG_ENUM.ERROR:
			return styles.error;

		case STYLE_LOG_ENUM.NONE:
			return '';

		default:
			return styles.info;
	}
};


/**
 * The function `selectColorStyle` takes a type as input and returns a color based on the type using a
 * switch statement.
 * @param type - The `type` parameter in the `selectColorStyle` function is used to determine which
 * color style to return based on the type of log message. The function uses a switch statement to
 * check the value of the `type` parameter against predefined constants like `STYLE_LOG_ENUM.INFO`,
 * `STYLE_LOG_ENUM
 * @returns The function `selectColorStyle` returns a color based on the `type` parameter provided. The
 * color returned depends on the value of `type` and corresponds to different styles defined in the
 * `STYLE_LOG_ENUM` object. If the `type` matches one of the defined styles, the corresponding color is
 * returned. If the `type` does not match any of the defined styles, the function returns
 */
export const selectColorStyle = (type) => {
	switch (type) {
		case STYLE_LOG_ENUM.INFO:
			return colorsApp.blue;

		case STYLE_LOG_ENUM.DONE:
			return colorsApp.green;

		case STYLE_LOG_ENUM.WARNING:
			return colorsApp.orange;

		case STYLE_LOG_ENUM.ERROR:
			return colorsApp.red;

		case STYLE_LOG_ENUM.OTHER:
			return colorsApp.black;

		case STYLE_LOG_ENUM.NONE:
			return colorsApp.transparent;

		default:
			return colorsApp.blue;
	}
};


/**
 * The function `selectDirStyle` takes in styles and a type, and returns a concatenated string
 * based on the type using predefined style enums.
 * @param styles - The `styles` parameter is an object containing CSS classes for styling the tooltip.
 * It likely includes properties such as `block`, `top`, `bottom`, `inline`, `left`, and `right`. These
 * classes are used to position and style the tooltip based on the `type` parameter provided to
 * @param type - The `type` parameter in the `selectDirStyle` function is used to determine the
 * style of the tooltip based on the provided enum values. The possible enum values for `type` are
 * `STYLE_DIR_ENUM.TOP`, `STYLE_DIR_ENUM.BOTTOM`, `STYLE_DIR_ENUM.LEFT`, `
 * @returns The `selectDirStyle` function returns a string that combines the styles based on the
 * `type` parameter provided. The returned string will include the styles for the block or inline
 * layout along with the specific positioning styles (top, bottom, left, right) based on the `type`
 * value. If the `type` is not recognized or is `STYLE_DIR_ENUM.NONE`, an empty string is
 */
export const selectDirStyle = (styles, type) => {
	switch (type) {
		case STYLE_DIR_ENUM.TOP:
			return `${styles.block} ${styles.top}`;
		case STYLE_DIR_ENUM.BOTTOM:
			return `${styles.block} ${styles.bottom}`;
		case STYLE_DIR_ENUM.LEFT:
			return `${styles.inline} ${styles.left}`;
		case STYLE_DIR_ENUM.RIGHT:
			return `${styles.inline} ${styles.right}`;
		case STYLE_DIR_ENUM.NONE:
			return ``;
		default:
			return ``;
	}
};


/**
 * The function `selectMenuStyle` returns a specific style based on the type provided, with a default
 * style if no matching type is found.
 * @param type - The `type` parameter in the `selectMenuStyle` function is used to determine which
 * style to select based on the type of menu aside style. It can have one of the following values:
 * `MENU_ASIDE_STYLE.FIRST`, `MENU_ASIDE_STYLE.SECOND`, or `MENU_ASIDE
 * @param styles - The `styles` parameter is an object that contains different style classes for menu
 * items at different levels.
 * @returns The function `selectMenuStyle` returns a specific style based on the `type` parameter
 * provided. If the `type` matches one of the predefined constants `MENU_ASIDE_STYLE.FIRST`,
 * `MENU_ASIDE_STYLE.SECOND`, or `MENU_ASIDE_STYLE.THIRD`, it returns the corresponding style from the
 * `styles` object. If the `type` does not match any of the
 */
export const selectMenuStyle = (type, styles) => {
	switch (type) {
		case MENU_ASIDE_STYLE.FIRST:
			return styles.first;

		case MENU_ASIDE_STYLE.SECOND:
			return styles.second;

		case MENU_ASIDE_STYLE.THIRD:
			return styles.third;

		default:
			return styles.first;
	}
};


/**
 * The function `selectCardStyle` takes an aspect and layout as input and returns a specific style
 * based on the aspect using a switch statement.
 * @param aspect - The `aspect` parameter in the `selectCardStyle` function is used to determine which
 * style to select based on the provided aspect value. The function uses a switch statement to check
 * the aspect value against predefined `STYLE_ENUM` constants (`FIRST`, `SECOND`, `THIRD`) and returns
 * the
 * @param layout - The `layout` parameter in the `selectCardStyle` function is an array that contains
 * different styles for a card. The function takes an `aspect` parameter which is used to determine
 * which style from the `layout` array should be selected and returned. If the `aspect` matches one of
 * the
 * @returns The function `selectCardStyle` returns a specific layout style based on the aspect provided
 * as an argument. If the aspect matches one of the predefined STYLE_ENUM (FIRST, SECOND, THIRD), it
 * returns the corresponding layout style from the array. If the aspect does not match any of the
 * predefined values, it returns the first layout style in the array by default.
 */
export const selectCardStyle = (aspect, layout) => {
	switch (aspect) {
		case STYLE_ENUM.FIRST:
			return layout[0]
		case STYLE_ENUM.SECOND:
			return layout[1]
		case STYLE_ENUM.THIRD:
			return layout[2]
		default:
			return layout[0]
	}
};

// #endregion
