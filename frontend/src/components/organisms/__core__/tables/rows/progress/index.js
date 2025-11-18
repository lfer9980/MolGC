'use client';
/*
	ORGANISMS - TABLE - ROWS
*/
// #region libraries
import React from 'react';
import Link from 'next/link';
// #endregion


// #region components
import { Badge } from 'components/atoms';
// #endregion


// #region assets
import { MODELS_TABLES_PROGRESO } from 'lib/models/tables/progress';
// #endregion


// #region utils
// #endregion


// #region hooks
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


function RowsProgress({ row, column, ...props }) {
	// #region hooks & others
	// #endregion


	// #region theme
	// #endregion


	// #region main UI
	return (
		<div
			className={styles.cell}
			style={{ justifyContent: column?.align }}
		>
			{column.key === MODELS_TABLES_PROGRESO.CATEGORIA &&
				<p className={styles.cell_bold}>
					{row[column.key]}
				</p>
			}

			{column.key === MODELS_TABLES_PROGRESO.PANTALLA &&
				<p>
					{row[column.key]}
				</p>
			}

			{column.key === MODELS_TABLES_PROGRESO.ESTADO &&
				<Badge
					label={row[column.key]}
					color={row?.color}
					pill
				/>
			}

			{column.key === MODELS_TABLES_PROGRESO.URL &&
				<Link
					className={styles.cell_link}
					href={row[column.key] ? row[column.key] : ''}
				>
					{row[column.key]}
				</Link>
			}
		</div>
	);
	// #endregion
}

export { RowsProgress };
