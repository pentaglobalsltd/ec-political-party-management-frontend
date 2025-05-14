import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LS_KEYS } from '@constants/local-store';
import { getStorage, setStorage } from '@utils/local-store';

export const LANGUAGE = {
  BANGLA: 'bn',
  ENGLISH: 'en',
};

interface UseLanguage {
  language: string | null;
  changeLanguage: (language: string) => void;
}

export const useLanguage = (): UseLanguage => {
  const { i18n } = useTranslation();
  const language = getStorage(LS_KEYS.LANGUAGE) || i18n.language;

  const changeLanguage = (language: string) => {
    if (language === LANGUAGE.BANGLA) {
      setStorage(LS_KEYS.LANGUAGE, LANGUAGE.BANGLA);
      i18n.changeLanguage(LANGUAGE.BANGLA);
    } else {
      setStorage(LS_KEYS.LANGUAGE, LANGUAGE.ENGLISH);
      i18n.changeLanguage(LANGUAGE.ENGLISH);
    }
  };

  useEffect(() => {
    i18n.changeLanguage(
      language === LANGUAGE.ENGLISH ? LANGUAGE.ENGLISH : LANGUAGE.BANGLA,
    );
  }, [i18n, language]);

  return {
    language,
    changeLanguage,
  };
};
