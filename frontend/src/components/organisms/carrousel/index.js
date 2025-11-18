'use client';
/*
	ORGANISIMS - CARROUSEL
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
import { useCarrousel } from './useCarrousel';
import { useSemanticLayout } from 'hooks/__core__';
// #endregion


// #region contexts & stores
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context';
// #endregion



function Carrousel({
	children,
	theme = ''
}) {
	// #region hooks & others
	const {
		content,
		header,
	} = useSemanticLayout({
		components: children,
	});

	const {
		ROW_UP,
		ROW_DOWN,
		rowDownRef,
		rowUpRef,
	} = useCarrousel({
		elements: {
			header: header,
			content: content,
		}
	});
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
			className={`${styles.carrousel} theme-${appliedTheme}`}
		>
			{ROW_UP &&
				<div className={styles.carrousel_up} ref={rowUpRef}>
					<div className={styles.tracker}>
						{ROW_UP}
					</div>
				</div>
			}

			{ROW_DOWN &&
				<div className={styles.carrousel_down} ref={rowDownRef}>
					<div className={styles.tracker}>
						{ROW_DOWN}
					</div>
				</div>
			}
		</div>
	);
	// #endregion
}

export { Carrousel };
