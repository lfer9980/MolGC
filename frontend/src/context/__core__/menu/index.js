'use client';
/*
	handles context for control side menu
*/
// #region libraries
import {
	createContext,
	useCallback,
	useContext,
	useRef,
	useState
} from 'react';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion

// #region utils
// #endregion


// #region reducers & stores
// #endregion


// #region requests
// #endregion

const MenuContext = createContext();


export function MenuProvider({ children }) {
	// #region references
	const activeSectionRef = useRef('avatars');
	const subscribersRef = useRef(new Set());
	// #endregion


	// #region contexts & hooks
	// #endregion


	// #region variables
	// #endregion


	// #region memos & callbacks
	const handlerActiveSection = useCallback((id) => {
		activeSectionRef.current = id;
		subscribersRef.current.forEach(fn => fn(id));
	}, []);


	const subscribeActiveSection = useCallback((fn) => {
		subscribersRef.current.add(fn);
		return () => { subscribersRef.current.delete(fn); };
	}, []);
	// #endregion


	// #region states
	const [openMenu, setOpenMenu] = useState(window.innerWidth >= 1024);
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const toggleMenu = (value) => {
		const newValue = value !== undefined ? value : !openMenu;
		setOpenMenu(newValue);
	};
	// #endregion


	// #region effects
	// #endregion


	// #region others
	// #endregion


	// #region main
	return (
		<MenuContext.Provider
			value={{
				openMenu,
				toggleMenu,
				activeSectionRef,
				handlerActiveSection,
				subscribeActiveSection
			}}
		>
			{children}
		</MenuContext.Provider>
	);
	// #endregion
}


// #region useHook
export function useMenuContext() {
	const context = useContext(MenuContext);

	/* Handler to avoid no context wrapped on component how need it */
	if (!context) {
		return {
			openMenu: false,
			toggleMenu: () => console.warn('toggleMenu llamado sin contexto'),
			activeSectionRef: '',
			handlerActiveSection: () => console.warn('handlerActiveSection llamado sin contexto'),
			subscribeActiveSection: () => console.warn('subscribeActiveSection llamado sin contexto'),
		};
	}

	return context;
};
// #endregion
