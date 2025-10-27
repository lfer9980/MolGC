/* 
	ATOMS - AVATARS
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
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function Avatar({
	image = '',
	label = '',
	size = 32,
	shadow = false,
	theme = '',
}) {
	// #region hooks & others
	const shadowState = shadow ? styles.shadow : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region main UI
	return (
		<figure className={`${styles.avatar} theme-${appliedTheme} ${shadowState}`}>
			<Image
				className={styles.avatar_image}
				src={image ? image : '/images/profile.jpg'}
				width={size}
				height={size}
				priority
				alt='avatar photo image'
			/>

			{label &&
				<figcaption className={styles.avatar_label}>
					{label}
				</figcaption>
			}
		</figure>
	);
	// #endregion
}

export { Avatar };