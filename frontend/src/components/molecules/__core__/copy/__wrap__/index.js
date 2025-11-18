'use client';
/*
	MOLECULES - INTERNAL COPY WRAP
*/
// #region libraries
// #endregion


// #region components
import { ButtonColor } from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
import { colorsApp } from 'lib/utils';
// #endregion


// #region hooks
import { useCopy } from './useCopy';
import { selectStyle, STYLE_ENUM } from 'lib/helpers';
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context/__core__';
// #endregion


function CopyWrap({
	aspect = STYLE_ENUM.FIRST,
	text = '',
	handler,
	children,
	theme = ''
}) {
	// #region hooks & others
	const {
		copied,
		handlerCopy,
	} = useCopy({
		text: text,
		handler: handler,
	})

	const aspectStyle = selectStyle(aspect, styles);
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.copy} ${aspectStyle} theme-${appliedTheme}`}>
			<div className={styles.copy_actions}>
				<ButtonColor
					label={`${copied ? 'copiado!' : 'copiar'}`}
					symbol={`${copied ? 'done' : 'content_copy'}`}
					handler={handlerCopy}
					color={colorsApp.black}
				/>
			</div>

			{children}
		</div>
	);
	// #endregion
}

export { CopyWrap };
