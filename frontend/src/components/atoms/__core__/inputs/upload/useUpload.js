'use client';
/*
	hanlder upload input files
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
import { useValidations } from 'hooks';
// #endregion


// #region requests
// #endregion


function useInputUpload({
	name = '',
	files = [],
	handler,
	maxFiles,
}) {
	// #region references
	const inputRef = useRef(null);
	const dropRef = useRef(null);
	// #endregion


	// #region contexts & hooks
	const {
		actualHint,
		handlerHint,
	} = useValidations({
		name: name,
		validateProperty: 'files',
	});
	// #endregion


	// #region variables
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region states
	const [drag, setDrag] = useState(false);
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerFiles = (event, type) => {
		/* handles upload files */
		event.preventDefault();

		let newFiles;
		let selectedFiles;

		setDrag(false);
		handlerHint('');

		/* validation need for drop or target file */
		if (type === 'drop') selectedFiles = Array.from(event.dataTransfer.files);
		if (type === 'target') selectedFiles = Array.from(event.target.files);


		/* evaluates if selected files is minor to maxFiles*/
		if (selectedFiles.length <= maxFiles) {
			newFiles = [...files, ...selectedFiles];

			/* evaluates if the new files excceds maxFiles */
			if (newFiles.length > maxFiles) return handlerHint('error');

			/* evaluates if the total files is minor to maxFiles */
			if (files.length >= maxFiles) return handlerHint('warning');

			return handler && handler(newFiles);
		};

		handlerHint('warning');
	};


	const handlerDragOver = (event) => {
		/* handler to  dragging event when it leaves*/
		event.preventDefault();
		event.stopPropagation();

		!drag && setDrag(true);
	};


	const handlerDragLeave = (event) => {
		/* handler to draggin event when its over the input */
		event.preventDefault();
		event.stopPropagation();

		if (dropRef.current && dropRef.current.contains(event.relatedTarget))
			setDrag(false);
	};


	const handlerReset = () => {
		/* reset the state to initial for user can try again */
		handlerHint('');
	};


	const handlerDrop = (event) => {
		event.preventDefault();
		event.stopPropagation();

		setDrag(false);
		handlerFiles(event, 'drop');
	};


	const handlerOpenFile = () => {
		/* this is for open file selection folder with a button component */
		inputRef.current && inputRef.current?.click();
	};
	// #endregion


	// #region effects
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		dropRef,
		inputRef,
		drag,
		actualHint,
		handlerFiles,
		handlerDragOver,
		handlerDragLeave,
		handlerReset,
		handlerDrop,
		handlerOpenFile,
	};
	// #endregion
}


export { useInputUpload };
