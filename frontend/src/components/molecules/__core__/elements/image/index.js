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


function ElementImage({
	image = '',
	label = '',
	alt = '',
	width,
	height = 50,
	margin = false,
	children
}) {
	// #region hooks & others
	const marginStyle = margin ? styles.margin : '';
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.element} ${marginStyle}`}>
			<figure
				className={styles.element_main}
				style={{
					width: width || '100%',
					height: height,
				}}
			>
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

			{(label || children) &&
				<figcaption className={styles.element_label}>
					{label || children}
				</figcaption>
			}
		</div>
	);
	// #endregion
}

export { ElementImage };
