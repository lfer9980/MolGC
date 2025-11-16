/* 
	ORGANISMS - BANNER ALERT
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import {
	Badge,
	ButtonPrimary,
	LoaderBar
} from 'components/atoms';

// #endregion


// #region assets
// #endregion


// #region utils
import {
	selectColorStyle,
	selectLogStyle,
	STYLE_ENUM,
	STYLE_LOG_ENUM
} from 'lib/helpers';
// #endregion


// #region hooks
import { useBannerAlert } from './useBannerAlert';
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


function BannerAlert({
	type = STYLE_LOG_ENUM.INFO,
	id = '',
	title = 'ACTION REQUIRED',
	label = '',
	labelButton = '',
	arrowButton = true,
	timer,
	handler,
	handlerClose,
	children,
}) {
	// #region hooks & others
	const {
		animation,
		maxValue,
		progress
	} = useBannerAlert({
		id: id,
		timer: timer,
		handlerClose: handlerClose,
	});

	const logStyle = selectLogStyle(type, styles);
	const colorStyle = selectColorStyle(type);
	// #endregion


	// #region main UI
	return (
		<article className={`${styles.banner} animate__animated ${animation}`}>
			<div
				className={styles.banner_symbol}
				style={{ backgroundColor: colorStyle }}
			>
				<Badge
					symbol={type}
					color={colorStyle}
					size={36}
					pill
				/>
			</div>

			<div className={styles.banner_main}>
				<div className={styles.banner_content}>
					{title &&
						<p className={`${styles.banner_title} ${logStyle} p2`}>
							{title}
						</p>
					}

					{label || children}


					{timer &&
						<LoaderBar
							maxValue={maxValue}
							progress={progress}
						/>
					}
				</div>

				<div className={styles.banner_actions}>
					<ButtonPrimary
						aspect={STYLE_ENUM.THIRD}
						label={labelButton?.toUpperCase()}
						arrow={arrowButton}
						handler={handler ? handler : () => handlerClose && handlerClose(id)}
					/>
				</div>
			</div>
		</article>
	);
	// #endregion
}

export { BannerAlert };