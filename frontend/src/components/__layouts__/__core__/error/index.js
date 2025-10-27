'use client';
/*
	LAYOUT - CORE - ERROR
*/
// #region libraries
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
// #endregion


// #region components
import { WrapMain } from 'components/__common__';
import { ButtonPrimary } from 'components/atoms';
import { ElementLabel } from 'components/molecules';
import { TimerX } from 'components/organisms';
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
import { TimerDownStoreProvider } from 'store/__core__/timer/down';
// #endregion


// #region styles
import './paralax.css';
import styles from './styles.module.scss';
// #endregion


function ErrorLayout({
	image = '',
	label = '',
	error = '',
	href = '/',
	labelButton = 'BACK HOME',
}) {
	// #region hooks & others
	const router = useRouter();

	useEffect(() => {
		document.documentElement.classList.add(styles.errorHTML)
		return () => document.documentElement.classList.remove(styles.errorHTML)
	}, []);
	// #endregion


	// #region theme
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<TimerDownStoreProvider
			name='notFound'
			defaultValue={0.2}
		>
			<div className={`${styles.error}`}>
				<WrapMain padding>
					<div className={styles.error_wrap}>
						<div className={styles.error_main}>
							<h1 className={styles.error_hero}>
								Oops! You ran out of Oxygen.
							</h1>

							<p className={styles.error_title}>
								{label || 'The page you are looking for is now beyound our reach.'} <br /> <br />
								Let's get you...
							</p>

							<div className={styles.error_label_wrap}>
								<span className={styles.error_label}>Back Home in</span>

								<div>
									<TimerX
										mode='countdown'
										border={false}
										handler={() => router.push(href)}
										mini
									/>
								</div>
							</div>


							<div className={styles.error_actions_button}>
								<ButtonPrimary
									label={labelButton}
									handler={() => router.push(href)}
								/>
							</div>


							<div className={styles.error_actions_redirect}>
								<ElementLabel
									label={labelButton}
									href={href}
									theme='dark'
								/>
							</div>
						</div>

						<div className={styles.error_image}>
							<figure className={styles.error_image_wrap}>
								<Image
									className={styles.error_image_main}
									src={image || '/images/error/404.svg'}
									alt={label}
									sizes='auto'
									priority
									fill
								/>

								<div className={styles.error_image_text}>
									<span>{error}</span>
								</div>
							</figure>
						</div>
					</div>
				</WrapMain>

				<div id="stars"></div>
				<div id="stars2"></div>
				<div id="stars3"></div>
			</div >
		</TimerDownStoreProvider>
	);
	// #endregion
}

export { ErrorLayout };