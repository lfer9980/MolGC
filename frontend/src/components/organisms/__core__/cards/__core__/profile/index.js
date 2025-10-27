'use client';
/* 
	MOLECULES - CARD PROFILE
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { Avatar } from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
import {
	STYLE_ENUM,
	selectCardStyle,
} from 'lib/helpers';
// #endregion


// #region hooks
import { useSemanticLayout } from 'hooks';
// #endregion


// #region styles
import styles from './styles.module.scss';
import layout1 from './layout1.module.scss';
import layout2 from './layout2.module.scss';
import layout3 from './layout3.module.scss';
import layout4 from './layout4.module.scss';

import { useThemeStore } from 'context/__core__';
// #endregion


function CardProfile({
	aspect = STYLE_ENUM.FIRST,
	image = '',
	size = 81,
	height,
	border = false,
	flexend = false,
	children,
	theme = ''
}) {
	// #region hooks & others
	const {
		actions,
		content,
		footer,
		header,
		subcontent,
	} = useSemanticLayout({
		components: children,
	})


	const layout = selectCardStyle(aspect, [layout1, layout2, layout3, layout4]);
	const borderStyle = border ? styles.border : '';
	const flexendStyle = flexend ? styles.flexend : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<article className={`${layout.card} ${layout[appliedTheme]} ${borderStyle}`}>
			{header &&
				<header className={`${layout.card_header} ${flexendStyle}`}>
					{header}
				</header>
			}

			<main
				className={layout.card_wrap}
				style={{ height: height ? height : '' }}
			>
				<section className={layout.card_main}>
					<div className={layout.card_content}>
						<Avatar
							image={image}
							size={size}
							shadow
						/>

						{content}
					</div>

					{subcontent &&
						<div className={layout.card_subcontent}>
							{subcontent}
						</div>
					}
				</section>

				{actions &&
					<section className={`${layout.card_actions} ${flexendStyle}`}>
						{actions}
					</section>
				}
			</main>


			{footer &&
				<footer className={layout.card_footer}>
					{footer}
				</footer>
			}
		</article >
	);
	// #endregion
}

export { CardProfile };