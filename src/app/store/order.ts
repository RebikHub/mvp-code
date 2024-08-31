import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { IConditionParameters, IOrder } from '../api/types';
import { createSelectors } from './createSelectors';
import { devToolsConfig } from './devToolsConfig';
import { persistConfig } from './persistConfig';

type Actions = {
  setOrder: (order: IOrder) => void;
  clearOrder: () => void;
  setOrderName: (name: string) => void;
  setRecipientId: (recipientId: string) => void;
  unsetRecipientId: (recipientId: string) => void;
  setOrderMessages: (messages: { sms: string; email: string }) => void;
  setOrderContainerId: (containerId: string) => void;
  setOrderConditions: ({
    params,
    ids,
  }: {
    params: IConditionParameters;
    ids: string[];
  }) => void;
};

const order: IOrder = {
  condition_ids: [],
  condition_parameters: {
    '': {
      days: '',
      date: '',
    },
  },
  date_create: '',
  container_id: '',
  container_id_old: '',
  recipient_ids: [],
  user_id: '',
  messages: {
    sms: '',
    email: '',
  },
  date_update: '',
  name: '',
  id: '',
};

const store = create<IOrder & Actions>()(
  devtools(
    persist(
      (set) => ({
        ...order,
        setOrder: (currentOrder) =>
          set((state) => ({
            condition_ids: currentOrder.condition_ids || state.condition_ids,
            condition_parameters:
              currentOrder.condition_parameters || state.condition_parameters,
            date_create: currentOrder.date_create || state.date_create,
            container_id: currentOrder.container_id || state.container_id,
            container_id_old: currentOrder.container_id || state.container_id,
            recipient_ids:
              currentOrder.recipient_ids || state.recipient_ids || [],
            user_id: currentOrder.user_id || state.user_id,
            messages: currentOrder.messages || state.messages,
            date_update: currentOrder.date_update || state.date_update,
            name: currentOrder.name || state.name,
            id: currentOrder.id || state.id,
          })),
        setOrderName: (name) =>
          set((state) => ({
            ...state,
            name,
          })),
        setRecipientId: (recipientId) =>
          set((state) => ({
            ...state,
            recipient_ids: state?.recipient_ids?.length
              ? [...state.recipient_ids, recipientId]
              : [recipientId],
          })),
        unsetRecipientId: (recipientId) =>
          set((state) => ({
            ...state,
            recipient_ids: state?.recipient_ids?.length
              ? [...state.recipient_ids.filter((id) => id !== recipientId)]
              : [],
          })),
        setOrderMessages: ({ sms, email }) =>
          set((state) => ({
            ...state,
            messages: {
              sms,
              email,
            },
          })),
        setOrderContainerId: (containerId) =>
          set((state) => ({
            ...state,
            container_id: containerId,
          })),
        setOrderConditions: ({ params, ids }) =>
          set((state) => ({
            ...state,
            condition_ids: [...ids],
            condition_parameters: {
              ...params,
            },
          })),
        clearOrder: () =>
          set({
            ...order,
          }),
      }),
      persistConfig('order'),
    ),
    devToolsConfig('order'),
  ),
);

export const useOrderStore = createSelectors(store);
