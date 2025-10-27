'use client';
/* 
	MOLECULES - CARD ARTWORK
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
import { selectCardStyle, STYLE_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
import { useSemanticLayout } from 'hooks';
// #endregion


// #region styles
import layout1 from './layout1.module.scss';
import layout2 from './layout2.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function CardSimple({
	aspect = STYLE_ENUM.FIRST,
	color = '',
	height,
	border = false,
	flexend = false,
	theme = '',
	children,
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
	});


	const layout = selectCardStyle(aspect, [layout1, layout2]);
	const borderStyle = border ? layout.border : '';
	const flexendStyle = flexend ? layout.flexend : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<article
			className={`${layout.card} ${layout[appliedTheme]} ${borderStyle}`}
			style={{ backgroundColor: color }}
		>
			{actions &&
				<section className={`${layout.card_actions} ${flexendStyle}`}>
					{actions}
				</section>
			}

			<main
				className={layout.card_wrap}
				style={{ height: height ? height : '' }}
			>
				{header &&
					<header className={`${layout.card_header} ${flexendStyle}`}>{header}</header>
				}

				<section className={layout.card_main}>
					{content &&
						<div className={layout.card_content}>{content}</div>
					}

					{subcontent &&
						<div className={layout.card_subcontent}>{subcontent}</div>
					}
				</section>
			</main>

			{footer &&
				<footer className={`${layout.card_footer} ${flexendStyle}`}>
					{footer}
				</footer>
			}
		</article>
	);
	// #endregion
}

export { CardSimple };