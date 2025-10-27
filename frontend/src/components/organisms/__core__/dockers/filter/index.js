'use client';
/* 
	ORGANISMS - DOCKERS | FILTER
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import {
	ButtonWrapper,
	InputSelect,
	InputText
} from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
import { useSemanticLayout } from 'hooks';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function DockerFilter({
	valueSearched,
	valueCategory,
	handlerSearched,
	handlerSearchedCategory,
	handlerCategory,
	options = [],
	children,
	theme = ''
}) {
	// #region hooks & others
	const {
		content,
		footer,
		header,
		subcontent,
	} = useSemanticLayout({
		components: children
	})
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.docker} theme-${appliedTheme}`}>
			{header &&
				<div className={styles.docker_header}>
					{header}
				</div>
			}

			<main className={styles.docker_main}>
				<div className={styles.docker_content}>
					{content}

					<div className={styles.docker_input}>
						<InputSelect
							label='Categoria'
							placeholder='selecciona una categoria'
							value={valueCategory}
							handler={(key) => {
								handlerSearchedCategory && handlerSearchedCategory(key);
								handlerCategory && handlerCategory({ key: key });
							}}
							options={options}
							bold
						/>

						<InputText
							label='Palabra clave'
							symbol='search'
							value={valueSearched}
							handler={handlerSearched}
							placeholder='Busca por nombre, palabra clave, etc'
						/>
					</div>
				</div>


				{subcontent &&
					<div className={styles.docker_subcontent}>
						{subcontent}
					</div>
				}
			</main>


			{footer &&
				<div className={styles.docker_footer}>
					{footer}
				</div>
			}
		</div>
	);
	// #endregion
}

export { DockerFilter };