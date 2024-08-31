import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { BeforeInstallPromptEvent } from '../types/types';
import { createSelectors } from './createSelectors';
import { devToolsConfig } from './devToolsConfig';

type State = {
  event: BeforeInstallPromptEvent | null;
};

type Actions = {
  setPrompt: (event: BeforeInstallPromptEvent) => void;
  clearPrompt: () => void;
};

const prompt: State = {
  event: null,
};

const store = create<State & Actions>()(
  devtools(
    (set) => ({
      ...prompt,
      setPrompt: (event) =>
        set((state) => ({
          event: event || state.event,
        })),
      clearPrompt: () =>
        set({
          event: null,
        }),
    }),
    devToolsConfig('prompt'),
  ),
);

export const usePromptStore = createSelectors(store);
