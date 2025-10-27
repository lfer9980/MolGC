'use client';
/* 
	ORGANISMS - CARD OTHERS - TABLE
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


function CardTable({
	title = '',
	label = '',
	icon = '',
	symbol = '',
	color = colorsApp.blue,
	elements = { key: '' },
	theme = ''
}) {
	// #region hooks & others
	const data = Object.entries(elements);
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<article className={`${styles.card} theme-${appliedTheme}`}>
			{icon || symbol &&
				<div>
					<Badge
						icon={icon}
						symbol={symbol}
						color={color}
						pill
					/>
				</div>
			}

			<div className={styles.card_main}>
				{title &&
					<p className={styles.card_title}>
						{title}
					</p>
				}

				{label &&
					<p className={styles.card_label}>
						{label}
					</p>
				}

				<table className={styles.card_table}>
					<tbody>
						{data.map(([key, value], i) => (
							<tr
								key={i}
								className={styles.card_table_tr}
							>
								<td className={styles.card_table_category}>
									{key}
								</td>
								<td className={styles.card_table_label}>
									{value}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</article>
	);
	// #endregion
}

export { CardTable };