'use client';
/*
	ATOMS - BADGE BULLET
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
// #endregion


// #region hooks
import { useColorComponent } from 'hooks';
// #endregion


// #region styles
import styles from '../styles.module.scss';
// #endregion


function BadgeBullet({
	color = colorsApp.blue,
	size = 8,
	pill = false,
	border = false,
	disabled = false,
}) {
	// #region hooks & others
	const {
		inColor,
	} = useColorComponent({
		color: color,
		border: border,
		disabled: disabled,
	});

	const pillStyle = pill ? styles.pill : '';
	const borderStyle = border ? styles.border : '';
	// #endregion


	// #region theme
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.badge} ${pillStyle}`}>
			<span
				className={`${styles.bullet} ${borderStyle}`}
				style={{
					backgroundColor: `${inColor}`,
					width: `${size}px`,
					height: `${size}px`,
					border: `${border ? `0.1rem solid ${colorsApp.gray}` : ''}`,
				}}
			/>
		</div>
	);
	// #endregion
}

export { BadgeBullet };
