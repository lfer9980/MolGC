'use client';
/*
	MOLECULES - CORE PAGE RESUME
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { Badge } from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
// #endregion


// #region hooks
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function PageResume({
	pages = [],
	current = 1,
	color = colorsApp.blue,
	size = 24,
	letters = false,
	rounded = false,
	noPadding = false,
	noSpace = false,
	theme = ''
}) {
	// #region hooks & others
	const _handlerPageLabel = (index) => (
		/* Function to generate page labels: numbers or letters */
		letters ? String.fromCharCode(65 + index) : index + 1
	);

	const spaceStyle = !noSpace ? styles.space : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region main UI
	return (
		<div className={styles.pages_wrap}>
			<div className={`${styles.pages} ${spaceStyle} theme-${appliedTheme}`}>
				{pages.map((item, i) => {
					/* to set the style of elements according to the actual position */
					const beforeItem = i + 1 <= current;
					const beforeLine = i + 2 <= current;

					return (
						<div
							key={i}
							className={`${styles.pages_item} ${spaceStyle}`}
						>
							<Badge
								color={color}
								label={_handlerPageLabel(i)}
								disabled={!beforeItem}
								rounded={rounded}
								size={size}
								noPadding={noPadding}
							/>

							<p
								className={styles.pages_label}
								style={{ color: `${beforeItem ? appliedTheme === 'dark' ? 'white' : color : colorsApp.gray}` }}
							>
								{item}
							</p>

							{i < pages.length - 1 && (
								<div
									className={styles.pages_line}
									style={{
										backgroundColor: `${beforeLine ? color : colorsApp.gray}`,
										height: `${beforeLine ? '0.2rem' : '0.1rem'}`
									}}
								/>
							)}
						</div>
					);
				})}
			</div >
		</div>
	);
	// #endregion
}

export { PageResume };
