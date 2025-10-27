'use client';
/* 
	ORGANISMS - CARDS - OTHERS - NOTIFICATION
*/
// #region libraries
import React from 'react';
import Link from 'next/link';
// #endregion


// #region components
import {
	Avatar,
	BadgeBullet,
	ButtonPrimary
} from 'components/atoms';

import { MenuDropdown } from 'components/organisms';
// #endregion


// #region assets
import { MENU_NOTIFICACION } from 'lib/data/menu/cards/notifications';
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
import { STYLE_DIR_ENUM, STYLE_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
import { useNotifications } from './useNotifications';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function CardNotification({
	image = '',
	title = '',
	label = '',
	href = '',
	timePassed,
	handler,
	handlerDelete,
	deleted = false,
	readed = false,
	theme = ''
}) {
	// #region hooks & others
	const {
		newTitle,
		parsedTime,
		open,
		handlerOpen,
	} = useNotifications({
		title: title,
		timePassed: timePassed,
	});

	const readedStyle = readed ? styles.readed : '';
	const deletedStyle = deleted ? styles.deleted : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<article className={`${styles.card} theme-${appliedTheme} ${readedStyle} ${deletedStyle}`}>
			{!deleted ?
				<>
					<Link
						href={href}
						className={styles.card_main}
					>
						<div className={styles.card_bullet}>
							{!readed &&
								<BadgeBullet
									color={colorsApp.blue}
									size={8}
									pill
								/>
							}
						</div>

						<Avatar
							image={image}
							size={64}
						/>

						<div className={styles.card_content}>
							<p className={styles.card_content_label}>
								{newTitle}
							</p>

							<p className={styles.card_content_description}>
								{label}
							</p>
						</div>
					</Link>

					<div className={styles.card_actions}>
						<div className={styles.card_button}>
							<span
								className={`material-symbols-outlined ${styles.dots}`}
								onClick={(event) => {
									event.preventDefault();
									event.stopPropagation();
									handlerOpen();
								}}
							>
								more_horiz
							</span>

							<MenuDropdown
								elements={MENU_NOTIFICACION}
								direction={STYLE_DIR_ENUM.TOP}
								open={open}
								handler={handlerDelete}
								handlerClose={handlerOpen}
							/>
						</div>
					</div>

					<p className={styles.card_date}>
						{parsedTime}
					</p>
				</>
				:
				<>
					<div className={styles.card_main}>
						<div className={styles.card_content}>
							<p className={styles.card_label}>
								Notificacion eliminada.
							</p>
						</div>
					</div>

					<div className={styles.card_actions}>
						<ButtonPrimary
							aspect={STYLE_ENUM.THIRD}
							label='Deshacer'
							symbol='undo'
							handler={handler}
						/>
					</div>
				</>
			}
		</article>
	);
	// #endregion
}

export { CardNotification };