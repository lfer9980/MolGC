'use client';
import { STYLE_ENUM } from 'lib/helpers';
/*
	MOLECULES - COPY TEXT
*/
// #region libraries
// #endregion


// #region components
import { CopyWrap } from '../__wrap__';
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
// #endregion


// #region styles
import styles from './styles.module.scss';
// #endregion


function CopyText({
	text = '',
	handler,
	children,
	theme = '',
}) {
	// #region hooks & others
	// #endregion


	// #region theme
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<CopyWrap
			text={text || children}
			aspect={STYLE_ENUM.SECOND}
			handler={handler}
			theme={theme}
		>
			<p className={styles.copy_label}>
				{text || children}
			</p>
		</CopyWrap>
	);
	// #endregion
}

export { CopyText };
