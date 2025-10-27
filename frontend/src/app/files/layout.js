/* 
	ROUTES - FILES | LAYOUT
*/

// #region libraries
import React from 'react';
// #endregion


// #region components
import { WrapMain } from 'components/__common__';
import { HeaderMolGC } from 'components/organisms';
import { Breadcrumbs, ElementLink } from 'components/molecules';
// #endregion


// #region assets
// #endregion


// #region utils
import config from 'config';
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


export const metadata = {
	title: `${config.appName} | ${config.brief}`,
	description: `${config.description}`,
};


export default function LayoutFiles({
	children,
}) {
	// #region contexts
	// #endregion


	// #region references
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
	// #endregion


	// #region theme
	// #endregion


	// #region main
	return (
		<>
			<HeaderMolGC />

			<WrapMain padding margin>
				<Breadcrumbs />

				{children}
			</WrapMain>

			<div className={styles.page_link}>
				<ElementLink
					href='/FAQs'
					label='Documentacion y tutoriales de uso'
					symbol='help'
				/>
			</div>
		</>
	);
	// #endregion
};