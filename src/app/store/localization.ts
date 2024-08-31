import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { Locale } from '../types/enums';
import { TLocale } from '../types/types';
import { createSelectors } from './createSelectors';
import { devToolsConfig } from './devToolsConfig';
import { persistConfig } from './persistConfig';

type Actions = {
  toggleLang: (lang: TLocale) => void;
  clearLang: () => void;
};

type State = {
  locale: TLocale;
};

const lang: State = {
  locale: Locale.rus,
};

const store = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        ...lang,
        toggleLang: (lang) =>
          set(() => ({
            locale: lang === Locale.rus ? Locale.rus : Locale.eng,
          })),
        clearLang: () =>
          set(() => ({
            ...lang,
          })),
      }),
      persistConfig('locale'),
    ),
    devToolsConfig('locale'),
  ),
);

export const useLocaleStore = createSelectors(store);
