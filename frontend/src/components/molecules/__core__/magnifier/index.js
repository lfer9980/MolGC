'use client';
/*
	MOLECULES - MAGNIFIER
*/
// #region libraries
import React from 'react';
import Image from 'next/image';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
import { useMagnifier } from './useMagnifier';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function Magnifier({
	image = '',
	label = '',
	size = 300,
	squareSize = 128,
	zoom = 2,
	theme = ''
}) {
	// #region hooks & others
	const {
		inImage,
		imageSize,
		imgRef,
		xAxis,
		yAxis,
		imgWidth,
		imgHeight,
		show,
		handlerMouseEnter,
		handlerMouseMove,
		handlerMouseLeave
	} = useMagnifier({
		image: image,
	});

	const showMagnifierStyle = show ? styles.show : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<div
			className={`${styles.magnifier} theme-${appliedTheme}`}
			style={{ width: size }}
		>
			<figure
				ref={imgRef}
				className={styles.magnifier_main}
				onMouseEnter={handlerMouseEnter}
				onMouseMove={(e) => handlerMouseMove(e)}
				onMouseLeave={handlerMouseLeave}
				style={{ aspectRatio: `${imageSize.width} / ${imageSize.height}` }}
			>
				<Image
					src={inImage}
					alt={label}
					className={styles.magnifier_image}
					sizes='auto'
					fill
				/>
			</figure>


			{label &&
				<p className={styles.magnifier_label}>
					{label}
				</p>
			}


			<div
				className={`${styles.magnifier_square} ${showMagnifierStyle}`}
				style={{
					top: `${yAxis - squareSize / 2}px`,
					left: `${xAxis - squareSize / 2}px`,
					height: `${squareSize}px`,
					width: `${squareSize}px`,
					backgroundImage: `url('${inImage}')`,
					backgroundSize: `${imgWidth * zoom}px ${imgHeight * zoom}px`,
					backgroundPositionX: `${-xAxis * zoom + squareSize / 2}px`,
					backgroundPositionY: `${-yAxis * zoom + squareSize / 2}px`,
				}}
			></div>
		</div>
	);
	// #endregion
}

export { Magnifier };
