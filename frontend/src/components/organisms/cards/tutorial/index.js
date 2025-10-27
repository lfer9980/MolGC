'use client';
/* 
	ORGANISMS - CARD TUTORIAL
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { SemActions, SemContent } from 'components/__common__';
import { CardArtwork } from 'components/organisms';
import { ButtonPrimary, HeadingTitle } from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context';
import { STYLE_ENUM } from 'lib/helpers';

// #endregion


function CardTutorial({
	image = '',
	title = '',
	resume = '',
	theme = '',
	children
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
		<CardArtwork
			aspect={STYLE_ENUM.FIRST}
			image={image}
			theme={appliedTheme}
			flexend
		>
			<SemContent>
				<HeadingTitle
					title={title}
					accent
				>
					{resume || children}
				</HeadingTitle>
			</SemContent>

			<SemActions>
				<div>
					<ButtonPrimary
						aspect={STYLE_ENUM.THIRD}
						label='Tutorial completo'
						arrow
					/>
				</div>
			</SemActions>
		</CardArtwork>
	);
	// #endregion
}

export { CardTutorial };