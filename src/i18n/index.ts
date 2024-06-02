import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationAZ from './locales/az/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  az: {
    translation: translationAZ
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'az',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
