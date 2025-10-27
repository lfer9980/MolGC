'use client';
/* 
	MOLECULES - BANNER SWEET
*/
// #region libraries
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
const MySwal = withReactContent(Swal);
import { colorsApp } from 'lib/utils';
// #endregion


// #region hooks
// #endregion


// #region styles
// #endregion


function BannerSweet({
	data = {},
	handler,
	children
}) {
	// #region hooks & others
	useEffect(() => {
		const {
			icon,
			title,
			text,
			label,
			confirmButtonText,
			confirmButtonColor,
			allowOutsideClick,
			scrollbarPadding,
			imageUrl,
			timer,
		} = data;


		MySwal.fire({
			icon: icon || '',
			title: title,
			text: text || label || children,
			confirmButtonText: !allowOutsideClick && confirmButtonText ? confirmButtonText : 'ENTENDIDO',
			timer: timer || null,
			timerProgressBar: timer && true,
			confirmButtonColor: confirmButtonColor || colorsApp.blue,
			allowOutsideClick: allowOutsideClick ? allowOutsideClick : false,
			scrollbarPadding: scrollbarPadding || false,
			imageUrl: imageUrl || '',
			imageWidth: 400,
			imageHeight: 200,
			imageAlt: 'informacion para el usuario',
			backdrop: '	rgba(59,62,77,0.75)',
			willOpen: () => document.body.style.overflow = 'unset',
		}).then((result) => {
			if (result.isConfirmed && handler) handler();
		});
	}, [data, handler, children]);
	// #endregion


	// #region main UI
	return null;
	// #endregion
}

export { BannerSweet };