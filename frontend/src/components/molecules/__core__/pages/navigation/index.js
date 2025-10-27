'use client';
/*
	MOLECULES - PAGES NAVIGATION
*/
// #region libraries
import React from "react";
// #endregion


// #region components
import { ButtonPill } from "components/atoms";
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks

// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function PagesNavigation({
	pages = 5,
	current = 1,
	handler,
	theme = ''
}) {
	// #region hooks & others
	const _renderPageNumbers = (value) => {
		/* renders the number inside navigator */
		let pageNumbers;

		if (pages <= 7)
			return value;

		else if (current <= 4)
			pageNumbers = [1, 2, 3, 4, 5, '...', pages];

		else if (current >= pages - 3)
			pageNumbers = [1, '...', pages - 4, pages - 3, pages - 2, pages - 1, pages];

		else {
			pageNumbers = [1, '...', current - 1, current, current + 1, '...', pages];
		};

		return pageNumbers;
	};


	current = Math.max(1, Math.min(current, pages));
	const _pages = Array.from({ length: pages }, (_, i) => i + 1);
	const pageNumbers = _renderPageNumbers(_pages);
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<div className={styles.pagination_wrap}>
			<div className={`${styles.pagination} theme-${appliedTheme}`}>
				<ButtonPill
					symbol="chevron_left"
					size={18}
					handler={() => handler && handler(current - 1)}
					disabled={current === 1}
				/>


				<div className={styles.pagination_main}>
					{pageNumbers.map((page, i) => (
						<button
							key={i}
							className={`${styles.pagination_link} ${page === current ? styles.active : ''}`}
							onClick={() => handler && handler(page)}
							disabled={page === '...'}
						>
							{page}
						</button>
					))}
				</div>

				<ButtonPill
					symbol="chevron_right"
					size={18}
					handler={() => handler && handler(current + 1)}
					disabled={current === pages}
				/>
			</div>
		</div>
	);
	// #endregion
}

export { PagesNavigation };