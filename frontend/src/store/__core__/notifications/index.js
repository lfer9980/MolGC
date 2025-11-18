'use client';
/*
	notification store center.
	Centralize how notifications are handled on an event.
*/

// #region libraries
import {
	createContext,
	useCallback,
	useContext,
	useState
} from 'react';

import { useRouter } from 'next/navigation';
// #endregion


// #region components
import { NativePortal } from 'components/__common__';
import { BannerAlert, BannerSweet } from 'components/organisms';
// #endregion


// #region assets
import { MESSAGE_ENUM } from './model';
// #endregion


// #region utils
import { STYLE_ENUM } from 'lib/helpers';
// #endregion


// #region hooks
// #endregion


const NotificationStoreContext = createContext();

export function NotificationStoreProvider({ children }) {
	// #region contexts
	// #endregion


	// #region references
	// #endregion


	// #region variables
	const router = useRouter();
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region states
	const [modal, setModal] = useState(null);
	const [alert, setAlert] = useState(null);
	const [notifications, setNotifications] = useState([]);

	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerAddMessage = useCallback(({ id, content, type }) => {
		/* add a new message */
		let newMessage = {
			id: id || crypto.randomUUID(),
			...content
		};

		if (type === MESSAGE_ENUM.MODAL) setModal({ ...newMessage });
		else if (type === MESSAGE_ENUM.ALERT) setAlert({ ...newMessage });
		else setNotifications((prev) => [newMessage, ...prev]);
	}, []);


	const handlerRemoveMessage = useCallback(({ id, type }) => {
		/* delete message by ID */
		if (type === MESSAGE_ENUM.MODAL) setModal(null);
		else if (type === MESSAGE_ENUM.ALERT) setAlert(null)
		else setNotifications((prev) => prev.filter((item) => item.id !== id));
	}, []);
	// #endregion


	// #region effects
	// #endregion


	// #region others
	// #endregion


	// #region main
	return (
		<NotificationStoreContext.Provider
			value={{
				modal,
				alert,
				notifications,
				handlerAddMessage,
				handlerRemoveMessage,
			}}
		>
			{children}


			{alert &&
				<NativePortal
					aspect={STYLE_ENUM.FIRST}
				>
					<BannerSweet
						data={alert}
						handler={() => {
							const navigateTo = alert?.href;
							handlerRemoveMessage({ type: MESSAGE_ENUM.ALERT });
							/* if banner needs to redirect to other place, run this */
							if (navigateTo) router.push(navigateTo);
						}}
					/>
				</NativePortal>
			}


			{notifications.length > 0 &&
				<NativePortal
					aspect={STYLE_ENUM.SECOND}
					scroll
				>
					{notifications.map((item, i) => (
						<BannerAlert
							key={i}
							id={item?.id}
							type={item?.log}
							title={item?.title}
							label={item?.label}
							labelButton={item?.labelButton}
							arrowButton={item?.arrowButton}
							timer={item?.timer}
							// handler={item?.handler}
							handlerClose={(id) => {
								handlerRemoveMessage({
									id: id,
									type: MESSAGE_ENUM.NOTIFICATION,
								})
							}}
						/>
					))}
				</NativePortal>
			}
		</NotificationStoreContext.Provider>
	);
	// #endregion
}

// #region useHook
export function useNotificationStore() {
	const context = useContext(NotificationStoreContext);

	if (!context) {
		return {
			notifications: [],
			handlerAddMessage: () => console.warn('handlerAddMessage llamado sin contexto'),
			handlerRemoveMessage: () => console.warn('handlerRemoveMessage llamado sin contexto'),
		};
	};

	return context;
};
// #endregion
