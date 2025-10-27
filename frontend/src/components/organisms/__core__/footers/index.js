'use client';
/* 
	ORGANISMS - FOOTER
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { ElementImage } from 'components/molecules';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
// #endregion


// #region hooks
import { useSemanticLayout } from 'hooks';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function FooterX({
	image = '',
	color = colorsApp.background_second,
	grid = true,
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
		components: children
	});


	const gridStyle = grid ? styles.grid : '';
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
		<footer
			className={`${styles.footer} theme-${appliedTheme}`}
			style={{
				color: color ? colorsApp.white : '',
				backgroundColor: color
			}}
		>
			{actions &&
				<div className={`${styles.footer_actions} ${flexendStyle}`}>
					{actions}
				</div>
			}

			{header &&
				<div className={styles.footer_header}>
					{header}
				</div>
			}

			<main className={styles.footer_main}>
				{content &&
					<div className={`${styles.footer_content} ${gridStyle}`}>
						{image &&
							<ElementImage
								image={image}
								width={81}
								height={81}
							/>
						}

						{content}
					</div>
				}

				{subcontent &&
					<div className={styles.footer_subcontent}>{subcontent}</div>
				}
			</main>

			{footer &&
				<footer className={`${styles.footer_footer} ${flexendStyle}`}>
					{footer}
				</footer>
			}
		</footer>
	);
	// #endregion
}

export { FooterX };