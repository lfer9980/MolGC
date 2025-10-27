'use client';
/* 
	ORGANISMS - TEXT EDITOR (MILKDOWN)
*/
// #region libraries
import React from 'react';

import {
	Milkdown,
	MilkdownProvider,
} from '@milkdown/react';
// #endregion


// #region components
import {
	ButtonColor,
	ButtonPrimary,
	ButtonWrapper,
	Loader,
} from 'components/atoms';

// #endregion


// #region assets
import { THEME_ENUM } from 'context/__core__/theme/__data__';
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
import { STYLE_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
import { useMilkdown } from './useMilkdown';
// #endregion


// #region styles
import styles from './styles.module.scss';
import '@milkdown/crepe/theme/common/style.css';
import { useThemeStore } from 'context/__core__';
// #endregion


const MilkdownWrapper = (WrappedComponent) => {
	return (props) => {
		return (
			<MilkdownProvider>
				<WrappedComponent {...props} />
			</MilkdownProvider>
		);
	};
};


function MilkdownEditor({
	title = 'document',
	data = '',
	header,
	footer,
	endpoints = {},
	readonly = false,
	edit = false,
	remove = false,
	download = false,
	theme = ''
}) {
	// #region hooks & others
	const {
		headerRef,
		footerRef,
		contentRef,
		loading,
		inRead,
		handlerInRead,
		handlerDeleteContent,
		handlerSaveContent,
		handlerDownload,
	} = useMilkdown({
		title: title,
		data: data,
		endpoints: endpoints,
		readonly: readonly,
	});
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<article className={styles.editor}>
			{edit &&
				<div className={`${styles.editor_edit}`}>
					{remove &&
						<div className={styles.editor_buttons}>
							<ButtonColor
								color={appliedTheme === THEME_ENUM.DARK ? colorsApp.dark_red : colorsApp.red}
								symbol='delete'
								handler={handlerDeleteContent}
							/>
						</div>
					}

					{inRead &&
						<div className={styles.editor_buttons}>
							<ButtonColor
								color={appliedTheme === THEME_ENUM.DARK ? colorsApp.dark_blue : colorsApp.blue}
								symbol='edit'
								label='editar contenido'
								handler={handlerInRead}
							/>
						</div>
					}
				</div>
			}


			<div className={styles.editor_main}>
				{header &&
					<div
						ref={headerRef}
						className={styles.editor_header}
					>
						{header}
					</div>
				}


				<div
					ref={contentRef}
					className={styles[appliedTheme]}
				>
					<Milkdown />
				</div>


				{footer &&
					<div
						ref={footerRef}
						className={styles.editor_footer}
					>
						{footer}
					</div>
				}
			</div>


			<ButtonWrapper>
				{/* NOTE: FOR THE CORRECT USAGE OF THIS COMPONENT YOU MUST NEED A BACKEND WITH CDN CONNECTION */}
				{edit && !inRead &&
					<ButtonPrimary
						aspect={STYLE_ENUM.SECOND}
						symbol='save'
						label='Guardar contenido'
						handler={handlerSaveContent}
						loading={loading}
					/>
				}

				{inRead && download &&
					<ButtonPrimary
						aspect={STYLE_ENUM.SECOND}
						symbol='download'
						label='descargar en PDF'
						handler={handlerDownload}
					/>
				}
			</ButtonWrapper>
		</article >
	);
	// #endregion
}

export default MilkdownWrapper(MilkdownEditor);