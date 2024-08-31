import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { IUser } from '../api/types';
import { createSelectors } from './createSelectors';
import { devToolsConfig } from './devToolsConfig';

type Actions = {
  setUser: (user: IUser) => void;
  updateLastVisit: (date: string) => void;
  clearUser: () => void;
};

const user: IUser = {
  avatar_image: '',
  date_birthday: '',
  date_last_visit: '',
  sex: '',
  email: '',
  phone: '',
  id: '',
  name: '',
};

const store = create<IUser & Actions>()(
  devtools(
    (set) => ({
      ...user,
      setUser: (currentUser) =>
        set((state) => ({
          avatar_image: currentUser.avatar_image || state.avatar_image,
          date_birthday: currentUser.date_birthday || state.date_birthday,
          date_last_visit: currentUser.date_last_visit || state.date_last_visit,
          sex: currentUser.sex || state.sex,
          email: currentUser.email || state.email,
          phone: currentUser.phone || state.phone,
          id: currentUser.id || state.id,
          name: currentUser.name || state.name,
        })),
      updateLastVisit: (date) =>
        set((state) => ({
          ...state,
          date_last_visit: date,
        })),
      clearUser: () =>
        set({
          avatar_image: '',
          date_birthday: '',
          date_last_visit: '',
          sex: '',
          email: '',
          phone: '',
          id: '',
          name: '',
        }),
    }),
    devToolsConfig('user'),
  ),
);

export const useUserStore = createSelectors(store);
