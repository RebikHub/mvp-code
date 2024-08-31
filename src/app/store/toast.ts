import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createSelectors } from './createSelectors';
import { devToolsConfig } from './devToolsConfig';

type State = {
  text: null | string;
  status: null | string;
  isOpen: boolean;
};

type Actions = {
  setToast: (arg: State) => void;
  clearToast: () => void;
};

const toast: State = {
  text: null,
  status: null,
  isOpen: false,
};

const store = create<State & Actions>()(
  devtools(
    (set) => ({
      ...toast,
      setToast: ({ text, status, isOpen }) =>
        set((state) => ({
          text: text || state.text,
          status: status || state.status,
          isOpen: isOpen ?? state.isOpen,
        })),
      clearToast: () =>
        set({
          text: null,
          status: null,
          isOpen: false,
        }),
    }),
    devToolsConfig('toast'),
  ),
);

export const useToastStore = createSelectors(store);
