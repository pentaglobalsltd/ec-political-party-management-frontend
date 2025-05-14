import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import bn from '../translations/bn';
import en from '../translations/en';

i18n.use(initReactI18next).init({
  fallbackLng: 'bn',
  lng: 'bn',
  preload: ['bn'],

  resources: {
    en,
    bn,
  },

  interpolation: {
    defaultVariables: {
      RM_URL: 'url.com',
    },
  },

  react: {
    defaultTransParent: 'span',
    useSuspense: true,
  },
});

export { i18n };
