'use client';
/*
Hook for semantic layouts:
use this when you need positioning children without order but with specific tag
*/

// #region libraries
import { isValidElement, useMemo, Children } from 'react';
// #endregion


// #region components
import {
	SemActions,
	SemContent,
	SemFooter,
	SemHeader,
	SemInput,
	SemSubcontent
} from 'components/__common__';
// #endregion


// #region assets
// #endregion

// #region utils
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
// #endregion


// #region requests
// #endregion


function useSemanticLayout({ components }) {
	// #region references
	// #endregion


	// #region contexts & hooks
	// #endregion


	// #region variables
	// #endregion


	// #region states
	// #endregion


	// #region memos & callbacks
	const {
		actions,
		content,
		footer,
		header,
		input,
		subcontent,
	} = useMemo(() => {
		let a, c, f, h, i, s;

		Children.forEach(components, child => {
			if (!isValidElement(child)) return;

			if (child.type === SemActions) a = child;
			if (child.type === SemContent) c = child;
			if (child.type === SemFooter) f = child;
			if (child.type === SemHeader) h = child;
			if (child.type === SemInput) i = child;
			if (child.type === SemSubcontent) s = child;
		});

		return {
			actions: a,
			content: c,
			footer: f,
			header: h,
			input: i,
			subcontent: s,
		};
	}, [components]);
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


	// #region main
	return {
		actions,
		content,
		footer,
		header,
		input,
		subcontent,
	};
	// #endregion
}


export { useSemanticLayout };
