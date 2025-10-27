'use client';
/* 
	MOLECULES - LIST PAYMENT
*/
// #region libraries
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// #endregion


// #region components
import { ButtonPrimary } from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
import { STYLE_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function ListPayment({
	company = 'visa',
	termination = 1111,
	type = 'credito',
	href = '',
	handler,
	theme = ''
}) {
	// #region hooks & others
	const router = useRouter();
	const imageLogo = `/icons/payment/${company}.svg`;
	const bullets = String.fromCharCode(8226).repeat(14);

	const handlerIn = () => {
		if (href) router.push(href);
		else handler && handler();
	};
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.list} theme-${appliedTheme}`}>
			<figure className={styles.list_symbol}>
				<Image
					src={imageLogo ? imageLogo : 'icons/heart.svg'}
					alt={`tarjeta de ${company}`}
					className={styles.list_image}
					sizes='auto'
					priority
					fill
				/>
			</figure>


			<div className={styles.list_summary}>
				<div className={styles.list_summary_main}>
					<p className={styles.list_title}>
						Tarjeta de <strong>{type}</strong>
					</p>

					<p className={styles.list_subtitle}>
						<span>{bullets}</span>{termination}
					</p>
				</div>

				<ButtonPrimary
					aspect={STYLE_ENUM.THIRD}
					label='EDITAR'
					handler={handlerIn}
					arrow
				/>
			</div>
		</div >
	);
	// #endregion
}

export { ListPayment };