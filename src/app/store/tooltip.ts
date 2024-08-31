import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createSelectors } from './createSelectors';
import { devToolsConfig } from './devToolsConfig';

type State = {
  id: null | string;
  isOpen: boolean;
};

type Actions = {
  setId: (id: string) => void;
  clearTooltip: () => void;
};

const tooltip: State = {
  id: null,
  isOpen: false,
};

const store = create<State & Actions>()(
  devtools(
    (set) => ({
      ...tooltip,
      setId: (id) =>
        set(() => ({
          id,
        })),
      clearTooltip: () => set(tooltip),
    }),
    devToolsConfig('tooltip'),
  ),
);

export const useTooltipStore = createSelectors(store);
