'use client';
/*
	ORGANISMS - TABLE - ROWS
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
// #endregion


// #region assets
import { MODELS_TABLES_TOPSIS } from 'lib/models/tables/TOPSIS';
// #endregion


// #region utils
// #endregion


// #region hooks
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


function RowsTOPSIS({ row, column, ...props }) {
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
			{column.key === MODELS_TABLES_TOPSIS.CLOSENESS &&
				<p>
					{row[column.key].toFixed(6)}
				</p>
			}

			{column.key === MODELS_TABLES_TOPSIS.CRITERIA && (
				<div className={styles.cell_criteria_container}>
					{Object.entries(row.criteria || {}).map(([key, value]) => (
						<div key={key} className={styles.cell_criteria_item}>
							<span className={styles.cell_criteria_label}>
								{key.toUpperCase().replace(/_/g, ' ')}:
							</span>
							<span className={styles.cell_criteria_value}>
								{value?.toFixed(6)}
							</span>
						</div>
					))}
				</div>
			)}

			{column.key === MODELS_TABLES_TOPSIS.D_NOT_IDEAL &&
				<p className={styles.cell_bold}>
					{row[column.key].toFixed(6)}
				</p>
			}

			{column.key === MODELS_TABLES_TOPSIS.D_IDEAL &&
				<p className={styles.cell_bold}>
					{row[column.key].toFixed(6)}
				</p>
			}

			{
				column.key === MODELS_TABLES_TOPSIS.FUNCTIONAL &&
				<p className={styles.cell_bold}>
					{row[column.key]}
				</p>
			}

			{column.key === MODELS_TABLES_TOPSIS.RANKING &&
				<p className={styles.cell_bold}>
					{row[column.key]}
				</p>
			}
		</div >
	);
	// #endregion
}

export { RowsTOPSIS };
