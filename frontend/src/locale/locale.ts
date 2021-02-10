import { Locale } from 'common-types';
import { useCallback, useState } from 'react';
import itoLocale from './itoLocale.json';

export type LocaleKeys = keyof typeof itoLocale['zh']

export const localeKeys = (function() {
  let keys: Record<string, string> = {};
  for (const key in itoLocale['zh']) {
    keys[key] = key;
  }
  return keys as Record<LocaleKeys, LocaleKeys>;
}());
export const langs = itoLocale;

export const getMessages = (locale: Locale) => {
  switch (locale) {
    case 'zh':
      return itoLocale['zh'];
    case 'en':
      return itoLocale['en'];
    default:
      return itoLocale['zh'];
  }
};

const useLocale = (initLocale='zh') => {
  const [locale, setLocale] = useState<Locale>(initLocale as Locale);

  const handleSetLocale = useCallback((locale: Locale) => () => {
    setLocale(locale);
  }, []);

  const messages = getMessages(locale);

  return ({
    locale,
    messages,
    handleSetLocale,
  });
};

export default useLocale;