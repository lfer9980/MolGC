'use client';
/* 
	MOLECULES - LIST STARS
*/
// #region libraries
import React from 'react';
import Image from 'next/image';
// #endregion


// #region components
import { Badge, Tooltip } from 'components/atoms';
import { ElementLabel } from 'components/molecules';
// #endregion


// #region assets
// #endregion


// #region utils
import { STYLE_ENUM, STYLE_DIR_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
import { useListStars } from './useListStars';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function ListStars({
	title = '',
	value = 0.0,
	maxValue = 5,
	size = 48,
	interactive = false,
	handler,
	theme = ''
}) {
	// #region hooks & others
	const {
		rating,
		stars,
		handlerClickRate,
	} = useListStars({
		value: value,
		handler: handler,
	})

	const interactiveStyle = interactive ? styles.interactive : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.list} theme-${appliedTheme}`}>
			<ElementLabel
				title={title}
				label={`${rating} de ${maxValue} estrellas`}
				aspect={STYLE_ENUM.SECOND}
			/>

			<div className={styles.list_main}>
				{stars?.map((item, i) => (
					<figure
						key={i}
						className={`${styles.list_image} ${interactiveStyle}`}
						onClick={(event) => interactive && handlerClickRate(event, i)}
					>
						<Image
							src={`/icons/stars/${item}.svg`}
							className={styles.list_image_main}
							width={size}
							height={size}
							alt='estrella de puntuacion'
						/>
					</figure>
				))}


				{interactive &&
					<div className={styles.list_help}>
						<div className={styles.list_symbol}>
							<Badge
								symbol='help'
								size={21}
							/>
						</div>

						<div className={styles.list_tooltip}>
							<Tooltip
								label={'da click a una estrella para asignar su calificacion'}
								direction={STYLE_DIR_ENUM.LEFT}
							/>
						</div>
					</div>
				}
			</div>
		</div>
	);
	// #endregion
}

export { ListStars };