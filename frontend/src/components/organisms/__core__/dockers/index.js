'use client';
/*
	ORGANISMS - DOCKER
	General structure for UI Component.
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
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
import { useThemeStore } from 'context/__core__';
import { ButtonWrapper } from 'components/atoms';
// #endregion


function Docker({
	title = '',
	label = '',
	labelButton = '',
	border = false,
	direction = 'column',
	handler,
	children,
	theme = ''
}) {
	// #region hooks & others
	const borderStyle = border ? styles.border : '';
	const directionStyle = direction === 'row' ? styles.row : styles.column;
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.docker} theme-${appliedTheme}`}>
			<div className={`${styles.docker_count} ${borderStyle}`}>
				<div className={styles.docker_title}>
					<HeadingTitle
						subheading={title}
						label={label}
					/>
				</div>

				<div className={`${styles.docker_main} ${directionStyle}`}>
					{children}
				</div>

				<div className={styles.docker_actions}>
					<ButtonWrapper>
						{(labelButton && handler) &&
							<ButtonPrimary
								label={labelButton}
								handler={handler}
								arrow
							/>
						}
					</ButtonWrapper>
				</div>
			</div>
		</div>
	);
	// #endregion
}

export { Docker };
