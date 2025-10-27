'use client';
/* 
	ORGANISMS - DOCKER CATEGORIES
*/
// #region libraries
import React, { useMemo, useState } from 'react';
// #endregion


// #region components
import { ButtonPill, Tag } from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
import { helperRandomColor } from 'lib/helpers';
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
import { useActivateAnimation, useSemanticLayout } from 'hooks';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function DockerCategories({
	category = { key: '', value: '' },
	categories = [],
	allowedColors = ['blue', 'green', 'purple'],
	handler,
	handlerReset,
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
	})


	const [nav, setNav] = useState(null);

	const handlerClick = (item, pos) => {
		handler && handler({ value: item });
		setNav(pos);
	};


	const allowedColorsKey = useMemo(
		() => allowedColors.join(','),
		[allowedColors]
	);

	const colors = useMemo(() =>
		helperRandomColor({
			count: categories.length,
			allowed: allowedColors
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[categories.length, allowedColorsKey]);


	const {
		animation,
		animationBase,
	} = useActivateAnimation({
		animationName: 'animate__fadeInRight'
	});
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.docker} theme-${appliedTheme}`}>
			{header &&
				<div className={styles.docker_header}>
					{header}
				</div>
			}

			<main className={styles.docker_main}>
				<div className={styles.docker_content}>
					{categories.length !== 0 &&
						<div className={styles.docker_tags_wrap}>
							<div className={styles.docker_tags}>
								{categories?.map((item, i) => (
									<Tag
										key={i}
										label={item}
										selected={nav === i}
										color={colors[i]}
										handler={() => handlerClick(item, i)}
									/>
								))}
							</div>

							{category.value &&
								<div className={`${styles.docker_clear} ${animation} ${animationBase}`} >
									<ButtonPill
										label='borrar filtros'
										symbol='close'
										color={colorsApp.transparent}
										handler={() => {
											handlerReset && handlerReset();
											setNav(null);
										}}
									/>
								</div>
							}
						</div>
					}

					{content}
				</div>

				{subcontent &&
					<div className={styles.docker_subcontent}>
						{subcontent}
					</div>
				}
			</main>

			{footer &&
				<div className={styles.docker_footer}>
					{footer}
				</div>
			}
		</div>
	);
	// #endregion
}

export { DockerCategories };