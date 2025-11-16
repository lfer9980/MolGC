'use client';
/* 
	ORGANISMS - DOCKER UPLOAD
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


function DockerUpload({
	heading = '',
	label = 'Upload files',
	elements = [],
	border = false,
	handler,
	theme = ''
}) {
	// #region hooks & others
	const handlerRemoveFile = (index) => handler((prev) => prev.filter((_, i) => i !== index));
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
				{heading &&
					<div className={styles.docker_title}>
						<HeadingTitle
							subheading={heading}
							label={label}
						/>
					</div>
				}

				<div className={styles.docker_main}>
					{elements.length !== 0 ?
						<>
							{elements.map((item, i) => (
								<ElementDownload
									key={`${item.label}${i}`}
									label={item?.label || item?.name}
									size={item.size}
									ext={item.ext}
									handler={() => handlerRemoveFile(i)}
									close
								/>
							))
							}
						</>
						:
						<BannerFeedback
							symbol='upload'
							title='Sube tu primer archivo y visualízalo aquí'
							label='Aquí visualizaras los elementos'
							size={48}
						/>
					}
				</div>
			</div>
		</div>
	);
	// #endregion
}

export { DockerUpload };