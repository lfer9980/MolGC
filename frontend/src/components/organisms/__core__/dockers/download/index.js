'use client';
/*
	ORGANISMS - DOCKER DOWNLOAD
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { HeadingTitle } from 'components/atoms';
import { ElementDownload } from 'components/molecules';
import { BannerFeedback } from 'components/organisms';
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


function DockerDownload({
	title = 'download',
	label = 'download files',
	elements = [],
	border = false,
	handler,
	theme = ''
}) {
	// #region hooks & others
	const borderStyle = border ? styles.border : '';
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

				<div className={styles.docker_main}>
					{elements.length !== 0 ?
						<>
							{elements.map((item) => (
								<ElementDownload
									key={item.label}
									label={item.label}
									size={item.size}
									ext={item.ext}
									handler={() => handler && handler()}
								/>
							))
							}
						</>
						:
						<BannerFeedback
							symbol='download'
							title='No hay archivos para descargar'
							label='Aqui visualizaras los elementos disponibles para descargarse'
							size={48}
						/>
					}
				</div>
			</div>
		</div>
	);
	// #endregion
}

export { DockerDownload };
