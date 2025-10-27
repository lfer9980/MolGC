'use client';
/* 
	MOLECULES - ELEMENT IMAGE
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
// #endregion


function ElementDownloadImage({
	image = '',
	label = '',
	href = '',
	alt = '',
}) {
	// #region hooks & others
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.element}`}>
			<figure className={styles.element_main}>
				{image &&
					<Image
						className={styles.element_image}
						src={image}
						alt={label || alt}
						sizes='auto'
						priority
						fill
					/>
				}
			</figure>

			{href &&
				<div className={styles.element_label}>
					Descargar imagen: {label}

					<span className='material-symbols-outlined'>
						download
					</span>
				</div>
			}
		</div>
	);
	// #endregion
}

export { ElementDownloadImage };