import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import appConfig from '@/configs/app.config';
import en from './lang/en.json';
import es from './lang/es.json';
import tr from './lang/tr.json';
import cn from './lang/cn.json';
import errEn from './lang/errors/en.json';
import errTr from './lang/errors/tr.json';
import errEs from './lang/errors/es.json';
import errCn from './lang/errors/cn.json';

const resources = {
  en: {
    translation: { ...en, ...errEn },
  },
  es: {
    translation: { ...es, ...errEs },
  },
  tr: {
    translation: { ...tr, ...errTr },
  },
  cn: {
    translation: { ...cn, ...errCn },
  },
};
i18n.use(initReactI18next).init({
  resources,
  fallbackLng: appConfig.locale,
  lng: appConfig.locale,
  interpolation: {
    escapeValue: false,
  },
});

export const dateLocales: {
  [key: string]: () => Promise<ILocale>;
} = {
  en: () => import('dayjs/locale/en'),
  cn: () => import('dayjs/locale/zh-cn'),
  es: () => import('dayjs/locale/es'),
  tr: () => import('dayjs/locale/tr'),
};

export default i18n;
