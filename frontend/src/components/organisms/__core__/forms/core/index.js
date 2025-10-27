'use client';
/* 
	ORGANISMS - FORMS
*/
// #region libraries
import React, { useState } from 'react';
// #endregion


// #region components
import { HeadingSubtitle } from 'components/atoms';
import { NavigatorTabs } from 'components/organisms';
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
import { useScreenSize, useSemanticLayout } from 'hooks';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function FormX({
	title = '',
	label = '',
	tabs = [],
	border = false,
	children,
	theme = ''
}) {
	// #region hooks & others
	const {
		content,
		footer,
		header,
		subcontent,
	} = useSemanticLayout({
		components: children
	});


	const {
		screenMatch
	} = useScreenSize({
		screen: ['mobile'],
		initial: true,
	});


	const [nav, setNav] = useState(0);

	const borderStyle = border ? styles.border : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.form} ${borderStyle} theme-${appliedTheme}`}>
			{(header || title) &&
				<div className={`${styles.form_header}`}>
					{title &&
						<HeadingSubtitle
							title={title}
							label={label}
						/>
					}

					{header}
				</div>
			}


			<main className={styles.form_main}>
				{subcontent &&
					<div className={styles.form_subcontent}>
						{tabs.length !== 0 &&
							<div className={styles.form_tabs}>
								<NavigatorTabs
									elements={tabs}
									navPos={nav}
									handler={setNav}
									direction={screenMatch ? 'row' : 'column'}
									align={screenMatch ? 'center' : 'left'}
								/>
							</div>
						}

						<div>
							{subcontent}
						</div>
					</div>
				}

				{content &&
					<div className={styles.form_content}>
						{tabs.length !== 0 ?
							React.Children.toArray(content.props.children)[nav]
							:
							<>
								{content}
							</>
						}
					</div>
				}
			</main>


			{footer &&
				<div className={`${styles.form_footer} ${!screenMatch ? styles.flexend : ''}`}>
					{footer}
				</div>
			}
		</div>
	);
	// #endregion
}

export { FormX };