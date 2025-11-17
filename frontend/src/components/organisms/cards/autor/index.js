'use client';
/* 
	ORGANISMS - CARD AUTOR
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { SemContent } from 'components/__common__';
import { CardProfile } from 'components/organisms';
// #endregion


// #region assets
// #endregion


// #region utils
import { STYLE_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context';
// #endregion


function CardAutor({
	image = '',
	name = '',
	position = '',
	brief = '',
	theme = ''
}) {
	// #region hooks & others
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<div className={styles.card}>
			<CardProfile
				aspect={STYLE_ENUM.FIRST}
				size={150}
				image={image}
				theme={appliedTheme}
			>
				<SemContent>
					<h5 className={styles.card_name}>
						{name}
					</h5>

					<p className={styles.card_position}>
						{position}
					</p>

					<p className={styles.card_brief}>
						{brief}
					</p>
				</SemContent>
			</CardProfile>
		</div>
	);
	// #endregion
}

export { CardAutor };