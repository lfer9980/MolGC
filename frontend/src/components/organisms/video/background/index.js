'use client';
/*
	ORGANISMS - VIDEO BACKGROUND
*/
// #region libraries
import React, { useState } from 'react';
// #endregion


// #region components
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
// #endregion


function VideoBackground({
	theme = '',
	path = '/videos/background.mp4',
	poster = '/images/poster.jpg',
	opacity = 0.5,
	children
}) {
	// #region hooks & others
	const [loaded, setLoaded] = useState(false);
	const loadedStyle = loaded ? opacity : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<section className={`${styles.video} theme-${appliedTheme}`}>
			<video
				className={`${styles.video_element}`}
				style={{ opacity: loadedStyle }}
				autoPlay
				loop
				muted
				playsInline
				poster={poster}
				onLoadedData={() => setLoaded(true)}
			>
				<source src={path} type="video/mp4" />
				Tu navegador no soporta video HTML5.
			</video>

			<div className={styles.video_content} >
				{children}
			</div>
		</section>
	);
	// #endregion
}

export { VideoBackground };
