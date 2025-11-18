'use client';
/*
	handles logic for menu dropdown logic
*/
// #region libraries
import { useRef, useState } from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion

// #region utils
// #endregion


// #region reducers & stores
// #endregion


// #region requests
// #endregion


function useMenuDropdown({ open, handlerClose }) {
	// #region references
	const menuRef = useRef(null);
	// #endregion


	// #region contexts & hooks
	// #endregion


	// #region variables
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region states
	const [inOpen, setInOpen] = useState(open);
	const [openModal, setOpenModal] = useState(null);
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const toggleMenu = (value) => {
		const newValue = value !== undefined ? value : !inOpen;
		setInOpen(newValue);

		handlerClose && handlerClose(newValue);
	};


	const handlerOpenModal = (index) => setOpenModal(index);
	const handlerCloseModal = () => setOpenModal(null);
	// #endregion


	// #region effects
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		menuRef,
		inOpen,
		openModal,
		toggleMenu,
		handlerOpenModal,
		handlerCloseModal,
	};
	// #endregion
}


export { useMenuDropdown };
