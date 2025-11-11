'use client';
/* 
	ORGANISMS - UPLOADX
*/
// #region libraries
import React, { useState } from 'react';
// #endregion


// #region components
import {
	ButtonPrimary,
	InputUpload,
	LoaderBar
} from 'components/atoms';

import { DockerUpload } from 'components/organisms';
// #endregion


// #region assets
// #endregion


// #region utils
import { STYLE_ENUM, STYLE_LOG_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
import { FaultStoreProvider } from 'store/__core__/fault';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function UploadX({
	name = '',
	title = '',
	label = '',
	files,
	handler,
	maxFiles = 2,
	filesAccepted = '.pdf,.docx,.pptx,.text,.xlsx',
	theme = ''
}) {
	// #region hooks & others
	const [progress, setProgress] = useState({ started: false, pc: 0 });

	const handlerResetUpload = () => setProgress((prev) => ({ ...prev, started: false }));
	const handlerUploadFile = (file) => handler && handler(file);
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<FaultStoreProvider>
			<article className={`${styles.upload} theme-${appliedTheme}`}>
				{progress.started ?
					<>
						<LoaderBar
							progress={progress.pc}
							status={STYLE_LOG_ENUM.INFO}
						/>

						<ButtonPrimary
							aspect={STYLE_ENUM.THIRD}
							handler={handlerResetUpload}
							label='intentar nuevamente'
						/>
					</>
					:
					<>
						<DockerUpload
							title={title}
							label={label}
							elements={files}
							handler={handler}
						/>

						<p className={styles.upload_title}>
							Puedes subir hasta máximo {maxFiles} archivo(s) por solicitud
						</p>

						<div className={styles.upload_main}>
							<InputUpload
								name={name}
								files={files}
								maxFiles={maxFiles}
								handler={handlerUploadFile}
								filesAccepted={filesAccepted}
								help={`Puedes subir archivos en los formatos ${filesAccepted}`}
								theme='dark'
							/>
						</div>
					</>
				}
			</article>
		</FaultStoreProvider>
	);
	// #endregion
}

export { UploadX };