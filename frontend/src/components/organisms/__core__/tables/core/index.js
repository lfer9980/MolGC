'use client';
/*
	ORGANISMS - TABLE X
*/
// #region libraries
import React from 'react';
import { TableVirtuoso } from 'react-virtuoso';
// #endregion


// #region components
import Paper from '@mui/material/Paper';
import { TableContent } from './__elements__/content';
import { TableHeader } from './__elements__/header';
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
import { useTable } from './useTable';
import { TableContext } from 'context/__core__';
// #endregion


// #region styles
import { useThemeStore } from 'context/__core__';
// #endregion


function TableX({
	data = [],
	columns,
	children,
	handlerLoadMore,
	loading = false,
	end = false,
	theme = ''
}) {
	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region hooks & others
	const {
		sort,
		sortedData,
		handlerSort,
		handlerResetSort,
		VirtuosoTableComponents,
	} = useTable({
		data: data,
		theme: appliedTheme,
	});
	// #endregion


	// #region main UI
	return (
		<TableContext.Provider
			value={{
				sort,
				columns,
				sortedData,
				handlerSort,
				handlerResetSort,
				theme: appliedTheme,
			}}
		>
			<Paper
				style={{
					width: '100%',
					boxShadow: 'none',
					borderRadius: '0',
					backgroundColor: 'transparent',
					marginBlockEnd: '1.6rem'
				}}
			>
				<TableVirtuoso
					data={loading ? [...sortedData, ...Array(5).fill({})] : sortedData}
					components={VirtuosoTableComponents}
					fixedHeaderContent={TableHeader}
					itemContent={(_index, row) => (
						<TableContent
							row={row}
							_index={_index}
						>
							{(props) => children && children(props)}
						</TableContent>
					)}
					style={{
						minHeight: '35rem',
						height: '100%',
						maxHeight: '70rem',
						border: 'none',
						boxShadow: 'none',
						overflowX: 'auto',
						borderRadius: '0',
						backgroundColor: 'transparent',
					}}
					endReached={() => !end && handlerLoadMore && handlerLoadMore()}
					increaseViewportBy={200}
				/>
			</Paper>
		</TableContext.Provider>
	);
	// #endregion
}

export { TableX };
