'use client';
/* 
	ORGANISMS - CARD OTHERS - COMMENT
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import {
	SemActions,
	SemContent,
	SemFooter,
	SemHeader,
	SemSubcontent
} from 'components/__common__';

import {
	Avatar,
	Badge,
	ButtonPrimary
} from 'components/atoms';

import { ListStars } from 'components/molecules';
import { CardSimple } from 'components/organisms';
import { CardCommentSkeleton } from './skeleton';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
import { STYLE_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function CardComment({
	image = '',
	username = '',
	title = '',
	label = '',
	stars = 0.0,
	likes,
	handler,
	loading = false,
	theme = ''
}) {
	// #region hooks & others
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	if (loading) return (
		<CardCommentSkeleton />
	);
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.card} theme-${appliedTheme}`}>
			<CardSimple
				aspect={STYLE_ENUM.FIRST}
				flexend
			>
				<SemHeader>
					{likes &&
						<Badge
							symbol='favorite'
							label={likes}
							color={colorsApp.black}
							size={21}
							pill
							noPadding
						/>
					}
				</SemHeader>


				<SemContent>
					<Avatar
						image={image}
						size={81}
						shadow
					/>
				</SemContent>


				<SemSubcontent>
					<p className={styles.card_title}>
						{username}
					</p>

					{stars !== 0.0 &&
						<ListStars
							value={stars}
							size={24}
						/>
					}

					<p className={styles.card_subtitle}>
						{title}
					</p>

					<p className={styles.card_label}>
						{label}
					</p>
				</SemSubcontent>


				<SemFooter>
					{handler &&
						<ButtonPrimary
							aspect={STYLE_ENUM.THIRD}
							label='Responder'
							handler={handler}
						/>
					}
				</SemFooter>
			</CardSimple>
		</div>
	);
	// #endregion
}

export { CardComment };