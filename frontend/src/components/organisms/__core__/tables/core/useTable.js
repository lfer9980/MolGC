'use client';
/*
	main logic for control tableX
*/
// #region libraries
import React, { useMemo } from 'react';
// #endregion


// #region components
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { styled, TableRow } from '@mui/material';
// #endregion


// #region assets
// #endregion

// #region utils
import { colorsApp } from 'lib/utils';
// #endregion


// #region hooks
import { useSort } from 'hooks';
// #endregion


// #region contexts & stores
// #endregion


// #region requests
// #endregion


function useTable({
	data = [],
	theme = ''
}) {
	// #region references
	// #endregion


	// #region contexts & hooks
	const {
		sort,
		sortedData,
		handlerSort,
		handlerResetSort,
	} = useSort({
		data: data,
	});
	// #endregion


	// #region variables
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region states
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	// #endregion


	// #region effects
	// #endregion


	// #region others
	const VirtuosoTableComponents = useMemo(() => {
		const StyledTableRow = styled(TableRow, {
			shouldForwardProp: prop => prop !== 'rowIndex'
		})(({ rowIndex }) => ({
			backgroundColor:
				rowIndex % 2 === 0
					? (theme === 'dark' ? colorsApp.even_inverse : colorsApp.even)
					: (theme === 'dark' ? colorsApp.odd_inverse : colorsApp.odd),
			'&:last-child td, &:last-child th': {
				border: 0,
			},
		}));

		return {
			Table: (props) => (
				<Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'auto' }} />
			),
			TableHead,
			TableRow: ({ item: _item, ...props }) => {
				const rowIndex = props.children?.props?._index ?? 0;

				return (
					<StyledTableRow
						{...props}
						rowIndex={rowIndex}
					/>
				);
			},
			TableBody: React.forwardRef(function myTableBody(props, ref) {
				return (
					<TableBody {...props} ref={ref} />
				)
			}),
		};
	}, [theme]);
	// #endregion


	// #region main
	return {
		sort,
		sortedData,
		handlerSort,
		handlerResetSort,
		VirtuosoTableComponents,
	};
	// #endregion
}


export { useTable };
