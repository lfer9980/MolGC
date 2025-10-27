'use client';
/* 
	ATOMS - INPUT UPLOAD
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { Hint, ButtonPrimary } from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
import { selectLogStyle, STYLE_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
import { useInputUpload } from './useUpload';
// #endregion


// #region styles
import styles from '../styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function InputUpload({
	name = '',
	label = '',
	files,
	handler,
	height,
	help = '',
	placeholder = 'Arrastra tus archivos aqui...',
	maxFiles = 1,
	filesAccepted = '',
	bold = false,
	disabled = false,
	theme = ''
}) {
	// #region hooks & others
	const {
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
	} = useInputUpload({
		name: name,
		files: files,
		handler: handler,
		maxFiles: maxFiles,
	});


	const dragStyle = drag ? styles.drag : '';
	const boldStyle = bold ? styles.bold : '';
	const disabledStyle = disabled ? styles.disabled : '';
	const logStyle = actualHint ? selectLogStyle(actualHint.log, styles) : '';
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;

	// #endregion

	// #region main UI
	return (
		<div className={`${styles.input} theme-${appliedTheme} ${logStyle} ${disabledStyle}`}>
			<p className={`${styles.input_title} ${boldStyle}`}>
				{label}
			</p>

			<div
				ref={dropRef}
				className={`${styles.input_upload} ${dragStyle}`}
				onDragOver={handlerDragOver}
				onDragLeave={handlerDragLeave}
				onDrop={handlerDrop}
				style={{ height: height || 'fit-content' }}
			>
				<div className={styles.input_hints}>
					<Hint
						label={actualHint.label || placeholder}
						state={actualHint.log || 'info'}
						theme={appliedTheme}
						disabled={disabled}
						icon={false}
						center
					/>
				</div>


				<input
					className={styles.input_element}
					ref={inputRef}
					id={name}
					type='file'
					onChange={(event) => handlerFiles(event, 'target')}
					accept={filesAccepted}
					multiple
					hidden
					disabled={disabled}
				/>


				{!drag &&
					actualHint.log === 'error' || actualHint.log === 'warning' ?
					<ButtonPrimary
						aspect={STYLE_ENUM.THIRD}
						handler={handlerReset}
						label='intentar nuevamente'
						disabled={disabled}
					/>
					:
					<ButtonPrimary
						aspect={STYLE_ENUM.SECOND}
						label='Buscar un archivo'
						handler={handlerOpenFile}
						disabled={disabled}
					/>
				}

				{help && !actualHint.label &&
					<Hint
						label={help}
						help
						theme={appliedTheme}
						disabled={disabled}
						center
					/>
				}
			</div>
		</div >
	);
	// #endregion
}

export { InputUpload };