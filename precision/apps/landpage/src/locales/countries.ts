import { Locale } from './index';

export type CountryCode = 
  | 'BR' 
  | 'DE' 
  | 'US' 
  | 'CA' 
  | 'ES' 
  | 'FR' 
  | 'IT' 
  | 'PT' 
  | 'NL' 
  | 'IE' 
  | 'BE' 
  | 'AT';

export type CurrencyCode = 'BRL' | 'EUR' | 'USD' | 'CAD';

export interface CountryInfo {
  code: CountryCode;
  flag: string;
  currency: CurrencyCode;
  locale: Locale;
  names: {
    pt: string;
    en: string;
    de: string;
  };
}

export const COUNTRIES: CountryInfo[] = [
  {
    code: 'BR',
    flag: '🇧🇷',
    currency: 'BRL',
    locale: 'pt',
    names: { pt: 'Brasil', en: 'Brazil', de: 'Brasilien' },
  },
  {
    code: 'DE',
    flag: '🇩🇪',
    currency: 'EUR',
    locale: 'de',
    names: { pt: 'Alemanha', en: 'Germany', de: 'Deutschland' },
  },
  {
    code: 'US',
    flag: '🇺🇸',
    currency: 'USD',
    locale: 'en',
    names: { pt: 'Estados Unidos', en: 'United States', de: 'Vereinigte Staaten' },
  },
  {
    code: 'CA',
    flag: '🇨🇦',
    currency: 'CAD',
    locale: 'en',
    names: { pt: 'Canadá', en: 'Canada', de: 'Kanada' },
  },
  {
    code: 'ES',
    flag: '🇪🇸',
    currency: 'EUR',
    locale: 'en',
    names: { pt: 'Espanha', en: 'Spain', de: 'Spanien' },
  },
  {
    code: 'FR',
    flag: '🇫🇷',
    currency: 'EUR',
    locale: 'en',
    names: { pt: 'França', en: 'France', de: 'Frankreich' },
  },
  {
    code: 'IT',
    flag: '🇮🇹',
    currency: 'EUR',
    locale: 'en',
    names: { pt: 'Itália', en: 'Italy', de: 'Italien' },
  },
  {
    code: 'PT',
    flag: '🇵🇹',
    currency: 'EUR',
    locale: 'en',
    names: { pt: 'Portugal', en: 'Portugal', de: 'Portugal' },
  },
  {
    code: 'NL',
    flag: '🇳🇱',
    currency: 'EUR',
    locale: 'en',
    names: { pt: 'Holanda', en: 'Netherlands', de: 'Niederlande' },
  },
  {
    code: 'IE',
    flag: '🇮🇪',
    currency: 'EUR',
    locale: 'en',
    names: { pt: 'Irlanda', en: 'Ireland', de: 'Irland' },
  },
  {
    code: 'BE',
    flag: '🇧🇪',
    currency: 'EUR',
    locale: 'en',
    names: { pt: 'Bélgica', en: 'Belgium', de: 'Belgien' },
  },
  {
    code: 'AT',
    flag: '🇦🇹',
    currency: 'EUR',
    locale: 'en',
    names: { pt: 'Áustria', en: 'Austria', de: 'Österreich' },
  },
];

export const getCurrencySymbol = (currency: CurrencyCode): string => {
  switch (currency) {
    case 'BRL':
      return 'R$';
    case 'EUR':
      return '€';
    case 'USD':
      return '$';
    case 'CAD':
      return 'CA$';
  }
};
