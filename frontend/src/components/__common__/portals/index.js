'use client';
/* 
	COMMON - PORTALS
*/

// #region libraries
import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
import { selectStyle, STYLE_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
import { useClickOutside } from 'hooks';
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


function NativePortal({
	aspect = STYLE_ENUM.FIRST,
	handlerClose,
	scroll = false,
	children,
}) {
	// #region hooks & others
	const portalRef = useRef(null);
	const overlayStyle = selectStyle(aspect, styles);

	useClickOutside({ ref: portalRef, handler: handlerClose });
	// #endregion


	// #region main UI
	return createPortal(
		<section className={`${styles.portal} ${overlayStyle}`}>
			<div className={`${scroll ? styles.portal_main : ''}`} ref={portalRef}>
				{children}
			</div>
		</section>,
		document.querySelector('#portal')
	);
	// #endregion
}

export { NativePortal };