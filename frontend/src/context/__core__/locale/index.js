'use client';
/* 
	controls locale stuff
*/

// #region libraries
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';

import { usePathname } from 'next/navigation';

/* ADD HERE supported locale dates */
import {
	enUS,
	es,
	fr
} from 'date-fns/locale';
// #endregion


// #region components
import { WrapMain } from 'components/__common__';
import { Loader, LOADER_ENUM } from 'components/atoms';
// #endregion


// #region assets
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from 'lib/__core__/i18n';
// #endregion


// #region utils
// #endregion


// #region hooks 
import { useLocalStorage } from 'hooks';
// #endregion


const _dataLocales = {
	'en': enUS,
	'es': es,
	'fr': fr,
};


const LocaleContext = createContext();

export function LocaleProvider({ name = 'LOCALE_V1', children }) {
	// #region contexts
	const {
		setLocalStorage,
		getLocalStorage,
	} = useLocalStorage({
		name: name,
		initial: DEFAULT_LOCALE,
	});
	// #endregion


	// #region references
	// #endregion


	// #region variables
	const pathname = usePathname();
	// #endregion


	// #region states
	const [locale, setLocale] = useState(null);
	const [dateLocale, setDateLocale] = useState(null);
	const [messages, setMessages] = useState({});
	const [loading, setLoading] = useState(true);
	// #endregion


	// #region memos & callbacks
	const getNamespaces = useCallback((pathname) => {
		const segments = pathname.split('/').filter(Boolean)
		return segments.join('/') || 'home';
	}, []);


	const getFallback = useCallback((supported) => {
		const userLocales = navigator.languages || [navigator.language];

		for (const locale of userLocales) {
			const name = locale.split('-')[0];
			if (supported.includes(name)) {
				const index = SUPPORTED_LOCALES.findIndex(item => item.name === name);
				return SUPPORTED_LOCALES[index];
			};
		};

		return DEFAULT_LOCALE;
	}, []);
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const t = (key, vars = {}) => {
		// for handles traductions on page...
		let label = messages?.[key] ?? key;

		// handles interpolation of translated text to add dinamic values
		if (typeof label === 'string') {
			Object.entries(vars).forEach(([name, value]) => {
				label = label.replace(new RegExp(`{{${name}}}`, 'g'), value);
			});
		};

		return label;
	};


	const handlerSetLocale = (value) => {
		// set new Locale manually...	
		const supported = SUPPORTED_LOCALES.map(item => item.name);

		if (supported.includes(value?.name)) {
			setLocale(value);
			setLocalStorage({ name: name, data: value });

			const newDataLocale = _dataLocales[value?.name];
			if (newDataLocale) setDateLocale({ [value?.name]: newDataLocale });
		};
	};
	// #endregion


	// #region effects
	useEffect(() => {
		// load from local storage or navigator the default locale
		const stored = getLocalStorage({ name });
		const supported = SUPPORTED_LOCALES.map(item => item.name);

		const fallback = stored || getFallback(supported);

		if (!stored) {
			setLocalStorage({ name: name, data: fallback });
		};

		if (fallback) {
			setLocale(fallback);

			const newDataLocale = _dataLocales[fallback?.name];
			if (newDataLocale) setDateLocale({ [fallback?.name]: newDataLocale });
		};

	}, [getFallback, setLocalStorage, getLocalStorage, name]);


	useEffect(() => {
		// load translations from locales folder	
		if (!locale) return;

		const loadTranslations = async () => {
			try {
				const namespace = getNamespaces(pathname);

				const [common, page] = await Promise.all([
					import(`lib/locales/${locale?.name}/common.json`).then(m => m.default),
					import(`lib/locales/${locale?.name}/${namespace}.json`).then(m => m.default).catch(() => ({}))
				]);

				setMessages({ ...common, ...page });
				setLoading(false);

			} catch (error) {
				console.error('Error loading translations:', error);
			};
		};

		loadTranslations();
	}, [name, getNamespaces, locale, pathname]);
	// #endregion


	// #region others
	// #endregion


	// #region main
	return (
		<LocaleContext.Provider
			value={{
				locale,
				dateLocale,
				t,
				handlerSetLocale,
			}}
		>
			{loading ?
				<WrapMain full padding>
					<Loader
						type={LOADER_ENUM.SPINNER}
						number={7}
						size={64}
						label='cargando...'
					/>
				</WrapMain>
				:
				children
			}
		</LocaleContext.Provider>
	);
	// #endregion
};

// #region useHook
export function useLocale() {
	const context = useContext(LocaleContext);

	if (!context) {
		return {
			locale: DEFAULT_LOCALE,
			dateLocale: enUS,
			t: () => console.warn('handlerSetLocale llamado sin contexto'),
			handlerSetLocale: () => console.warn('handlerSetLocale llamado sin contexto'),
		};
	};

	return context;
};
// #endregion