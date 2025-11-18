'use client';
/*
	MOLECULES - TREE
*/
// #region libraries
import React from 'react';
// #endregion


// #region components
import { HeadingTitle } from 'components/atoms';
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
// #endregion


// #region styles
import styles from './styles.module.scss';
import { useThemeStore } from 'context';
// #endregion

const TreeNode = ({ node, level, prefix }) => {
	const style = { marginLeft: `${level * 1.25}rem` };

	return (
		<li
			className={styles.tree_node}
			style={style}
		>
			{prefix}
			<span>
				{node.label}
			</span>

			{node.children && (
				<ul>
					{node.children.map((child, i) => (
						<TreeNode
							key={i}
							node={child}
							level={level + 1}
							prefix={prefix}
						/>
					))}
				</ul>
			)}
		</li>
	);
};

function Tree({
	title = '',
	label = '',
	elements = [],
	prefix = '',
	theme = ''
}) {
	// #region hooks & others
	// #endregion


	// #region theme
	const { theme: globalTheme } = useThemeStore();
	const appliedTheme = theme || globalTheme;
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<ul className={styles.tree}>
			<HeadingTitle
				subtitle={title}
				label={label}
			/>

			{elements?.map((item, i) => (
				<TreeNode
					key={i}
					node={item}
					level={0}
					prefix={prefix}
				/>
			))}
		</ul>
	);
	// #endregion
}

export { Tree };
