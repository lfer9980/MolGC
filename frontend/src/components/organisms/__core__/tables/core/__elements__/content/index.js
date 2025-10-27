'use client';
/* 
	ORGANISMS - TABLES ELEMENTS CONTENT
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { TableCell } from '@mui/material';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
// #endregion


// #region hooks
import { useTableContext } from 'context/__core__/table';
import Skeleton from 'react-loading-skeleton';
// #endregion


// #region styles
// #endregion


function TableContent({ children, ...props }) {
	// #region hooks & others
	const { columns, theme } = useTableContext();
	// #endregion


	// #region theme
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<>
			{columns?.map((column) => (
				<TableCell
					key={column.key}
					align={column.align}
					sx={{
						fontSize: '1.4rem',
						borderBottom: 'none',
						fontFamily: 'opensans',
						color: `${theme === 'dark' ? colorsApp.white : colorsApp.black}`,
					}}
				>
					{props.row && Object.keys(props.row).length > 0 ?
						<>
							{children({ column, ...props })}
						</>
						:
						<Skeleton variant='rectangular' width='100%' height={20} />
					}
				</TableCell>
			))}
		</>
	);
	// #endregion
}

export { TableContent };