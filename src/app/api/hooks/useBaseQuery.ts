import { QueryFunction, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useMemo } from 'react';

export const useBaseQuery = <T, D>(
  fetcher: QueryFunction<AxiosResponse<D, T>, string[], never>,
  key: string,
) => {
  const queryClient = useQueryClient();
  const state = queryClient.getQueryState(['status-auth']);

  const { isSuccess, isError, isLoading, isPending, data, refetch } = useQuery({
    queryKey: [key],
    queryFn: fetcher,
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: !!(state?.data as { token: string; auth: boolean })?.auth,
  });

  return useMemo(
    () => ({
      isSuccess,
      isError,
      isLoading,
      isPending,
      data: data?.data,
      refetch,
    }),
    [data?.data, isError, isLoading, isPending, isSuccess, refetch],
  );
};
