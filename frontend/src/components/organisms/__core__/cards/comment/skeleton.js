'use client';
/*
	ORGANISMS - OTHER CARDS COMMENT | SKELETON
*/
// #region libraries
import React from 'react';
import Skeleton from 'react-loading-skeleton';
// #endregion


// #region components
import {
	SemActions,
	SemContent,
	SemHeader,
	SemSubcontent
} from 'components/__common__';

import { CardArtwork } from 'components/organisms';
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


function CardCommentSkeleton() {
	// #region hooks & others
	// #endregion


	// #region theme
	// #endregion


	// #region main UI
	return (
		<div className={`${styles.class}`}>
			<CardArtwork flexend>
				<SemHeader>
					<Skeleton width={50} height={30} style={{ marginBottom: '10px' }} />
				</SemHeader>


				<SemContent>
					<Skeleton width={80} height={80} circle />
				</SemContent>
				<SemSubcontent>
					<Skeleton width={100} height={20} style={{ marginBottom: '10px' }} />
					<Skeleton width={150} height={20} style={{ marginBottom: '10px' }} />
					<Skeleton width={250} height={30} style={{ marginBottom: '3rem' }} />
					<Skeleton width={150} height={20} style={{ marginBottom: '10px' }} />
					<Skeleton width={250} height={20} style={{ marginBottom: '10px' }} />
				</SemSubcontent>


				<SemActions>
					<Skeleton width={75} height={30} style={{ marginBottom: '10px' }} />
				</SemActions>
			</CardArtwork>
		</div>
	);
	// #endregion
}

export { CardCommentSkeleton };
