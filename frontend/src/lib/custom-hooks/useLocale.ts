import { useCallback, useState } from "react";

export type Locale = 'zh' | 'en'

const useLocale = (initCustomLocale='zh') => {

  const [locale, setLocale] = useState<Locale>(initCustomLocale as Locale);

  const handleSetLocale = useCallback((locale: Locale) => () => {
    setLocale(locale);
  }, []);

  // const messages = getLangMessages(locale);
  const messages = {};

  return ({
    locale,
    messages,
    handleSetLocale,
  });
};

export default useLocale;