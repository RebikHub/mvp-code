import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useUserStore } from '@/app/store/user';

import api from '../api';

export const useGetUser = (userId: string) => {
  const setUser = useUserStore.use.setUser();
  const { isSuccess, data, refetch } = useQuery({
    queryKey: [`get/users/${userId}`],
    queryFn: () => api.users.getUser({ user_id: userId }),
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: !!userId,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data.data);
    }
  }, [data, isSuccess, setUser]);

  return {
    isSuccess,
    data,
    refetch,
  };
};
