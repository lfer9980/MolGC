'use client';
/*
	ORGANISMS - TABLES ELEMENTS HEADER
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { ButtonNav } from 'components/atoms';
import { TableCell, TableRow } from '@mui/material';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
// #endregion


// #region hooks
import { useTableContext } from 'context/__core__/table';
// #endregion


// #region styles
// #endregion


function TableHeader() {
	// #region hooks & others
	const {
		sort,
		columns,
		handlerSort,
		handlerResetSort,
		theme,
	} = useTableContext();
	// #endregion


	// #region theme
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<TableRow>
			{columns?.map((column) => (
				<TableCell
					key={column.key}
					variant='head'
					style={{ width: column.width }}
					sx={{
						backgroundColor: `${theme === 'dark' ? colorsApp.background_second : colorsApp.background_first}`,
						color: `${colorsApp.white}`,
						fontFamily: 'nunito',
						fontSize: '1.4rem',
						fontWeight: 'bold',
						borderRadius: 0,
						padding: 0,
					}}
				>
					<ButtonNav
						label={column.label}
						symbol={column.symbol}
						align={column.align}
						selected={sort.key === column.key}
						direction={sort.key === column.key && sort.direction}
						sorting={column.sortable}
						handler={() => column.sortable && handlerSort(column.key)}
						handlerReset={handlerResetSort}
						theme={theme}
					/>
				</TableCell>
			))
			}
		</TableRow >
	);
	// #endregion
}

export { TableHeader };
