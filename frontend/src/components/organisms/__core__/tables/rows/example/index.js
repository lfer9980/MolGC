'use client';
/*
	ROWS FOR EXAMPLE (POKEMONS)
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
// #endregion


// #region assets
import { MODELS_TABLE_EXAMPLE } from 'lib/models/tables/example';
// #endregion


// #region utils
// #endregion


// #region hooks
// #endregion


// #region styles
// import styles from './styles.module.scss';
// #endregion


function RowsExample({ row, column, ...props }) {
	// #region hooks & others
	// #endregion


	// #region theme
	// #endregion


	// #region main UI
	return (
		<>
			{column.key === MODELS_TABLE_EXAMPLE.NAME &&
				<p>
					{row[column.key]}
				</p>
			}
			{column.key === MODELS_TABLE_EXAMPLE.URL &&
				<p>
					{row[column.key]}
				</p>
			}
		</>
	);
	// #endregion
}

export { RowsExample };
