'use client';
/*
	handles setting of colors dinamically
*/
// #region libraries
import { useEffect, useState } from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion

// #region utils
import { colorsApp } from 'lib/utils';
// #endregion


// #region reducers & stores
// #endregion


// #region requests
// #endregion


function useColorComponent({
	color = '',
	border = false,
	disabled = false,
}) {
	// #region contexts
	// #endregion


	// #region references
	// #endregion


	// #region variables
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region states
	const [inColor, setInColor] = useState(null);
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	// #endregion


	// #region effects
	useEffect(() => {
		const handleColor = () => {
			let colorSelect;

			if (border) colorSelect = colorsApp.transparent;
			else if (disabled) colorSelect = colorsApp.gray;
			else colorSelect = color;

			setInColor(colorSelect);
		};

		handleColor();
	}, [border, disabled, color]);
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		inColor,
	};
	// #endregion
}


export { useColorComponent };
