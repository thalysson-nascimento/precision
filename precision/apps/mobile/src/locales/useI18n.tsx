'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Locale, TranslationKeys, NestedKeys } from './index';

export function translate(dict: any, path: string, params?: Record<string, string | number>): string {
  const parts = path.split('.');
  let current = dict;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return path;
    }
  }
  if (typeof current !== 'string') return path;
  
  let result = current;
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      result = result.replace(new RegExp(`{${key}}`, 'g'), String(value));
    }
  }
  return result;
}

interface I18nContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: NestedKeys<TranslationKeys>, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export const I18nProvider: React.FC<{
  initialLocale: Locale;
  children: ReactNode;
}> = ({ initialLocale, children }) => {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    // Set cookie
    document.cookie = `precision_locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
  };

  const t = (path: NestedKeys<TranslationKeys>, params?: Record<string, string | number>) => {
    const dict = translations[locale] || translations['pt'];
    return translate(dict, path, params);
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
