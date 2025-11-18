'use client';
/*
	ORGANISMS - BANNER MODAL
*/
// #region libraries
import React, { useState } from 'react';
// #endregion


// #region components
import { NativePortal } from 'components/__common__';

import {
	ButtonPill,
	ButtonPrimary,
	ButtonColor
} from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils/colors';
import { STYLE_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


export const BANNER_ENUM = {
	DEFAULT: 'DEFAULT',
	INFO: 'INFORMATION',
	DELETE: 'DELETE',
	CONFIRM: 'CONFIRM',
};


function BannerModal({
	type = BANNER_ENUM.INFO,
	labelButton = 'GO TO PAGE',
	scroll = false,
	clickOutside = false,
	margin = false,
	handler,
	handlerClose,
	children
}) {
	// #region hooks & others
	const [animation, setAnimation] = useState('animate__fadeInDown');

	const handleCloseWithAnimation = () => {
		if (handlerClose) {
			setAnimation('animate__fadeOutUp');

			const timeout = setTimeout(() => {
				handlerClose();
			}, 500);

			return () => clearTimeout(timeout);
		};
	};

	const marginStyle = margin ? styles.margin : '';
	// #endregion


	// #region main UI
	return (
		<NativePortal
			handlerClose={() => (type === BANNER_ENUM.INFO || clickOutside) && handlerClose()}
			scroll={scroll}
		>
			<div className={`${styles.banner} ${marginStyle} animate__animated ${animation}`}>
				<div className={styles.banner_head}>
					<ButtonPill
						symbol='close'
						handler={handleCloseWithAnimation}
					/>
				</div>


				<div className={styles.banner_main}>
					<div className={styles.banner_main_content}>
						{children}
					</div>

					{type != BANNER_ENUM.DEFAULT &&
						<div className={styles.banner_main_actions}>
							{type === BANNER_ENUM.INFO ?
								<ButtonPrimary
									aspect={STYLE_ENUM.THIRD}
									label={labelButton}
									handler={handler}
								/>
								:
								<>
									{type === BANNER_ENUM.CONFIRM &&
										<ButtonPrimary
											aspect={STYLE_ENUM.FIRST}
											label='CONFIRMAR'
											handler={handler}
											center
										/>
									}

									{type === BANNER_ENUM.DELETE &&
										<ButtonColor
											color={colorsApp.red}
											label='ELIMINAR'
											handler={handler}
											center
										/>
									}

									<ButtonColor
										label='CANCELAR'
										handler={handleCloseWithAnimation}
										center
									/>
								</>
							}
						</div>
					}
				</div>
			</div>
		</NativePortal>
	);
	// #endregion
}

export { BannerModal };
