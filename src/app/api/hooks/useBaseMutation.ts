import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useMemo } from 'react';

import { useToastStore } from '@/app/store/toast';

import { errorMessage } from '@/app/services/utils/errorMessage';

type BaseMutationSuccess = {
  type?: string;
  text?: string;
  isSuccess?: boolean;
};

// type FetcherFunction<T, D> = (body: T) => Promise<D>;

type BaseMutationOptions = {
  invalidateQueryKey?: string;
  success?: BaseMutationSuccess;
};

export const useBaseMutation = <T, D>(
  fetcher: MutationFunction<T, D>,
  options?: BaseMutationOptions,
) => {
  const queryClient = useQueryClient();

  const setToast = useToastStore.use.setToast();

  const { mutate, mutateAsync, isError, isSuccess, isPending, data } =
    useMutation({
      mutationFn: fetcher,
      onSuccess: () => {
        setToast({
          isOpen: true,
          text: options?.success?.text || 'toast.default.ok',
          status: options?.success?.type || 'ok',
        });

        queryClient.invalidateQueries({
          queryKey: [options?.invalidateQueryKey],
        });
      },
      onError: ({ message }) => {
        setToast({
          isOpen: true,
          text: errorMessage(message),
          status: 'error',
        });
      },
    });

  return useMemo(
    () => ({
      mutate,
      mutateAsync,
      data,
      isSuccess,
      isError,
      isPending,
    }),
    [data, isError, isPending, isSuccess, mutate, mutateAsync],
  );
};
