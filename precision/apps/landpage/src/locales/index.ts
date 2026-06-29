import { pt } from './pt';
import { en } from './en';
import { de } from './de';

export const translations = {
  pt,
  en,
  de,
};

export type Locale = 'pt' | 'en' | 'de';
export type TranslationKeys = typeof pt;

// Deep key paths type utility
type Join<K, P> = K extends string | number ?
  P extends string | number ?
    `${K}${"" extends P ? "" : "."}${P}`
    : never : never;

export type NestedKeys<T, D extends number = 3> = [D] extends [never] ? never : T extends object ?
  { [K in keyof T]-?: K extends string | number ?
      `${K}` | Join<K, NestedKeys<T[K], Prev[D]>>
      : never
  }[keyof T] : "";

type Prev = [never, 0, 1, 2, 3];
