import { useCallback, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { MainPath, OrderPath, RootPath } from '@/app/router/enum/enum';

import { stepsData } from '@/app/services/utils/stepsData';

export const useStepsData = () => {
  const [params, setParams] = useSearchParams('completed');
  const location = useLocation();
  const isCreateOrder = location.pathname.includes(
    `/${RootPath.main}/${MainPath.orderCreate}`,
  );
  const isConfirm = location.pathname.includes(`/${OrderPath.confirm}`);

  const setStatus = useCallback(
    (status: boolean) => {
      setParams(`completed=${status ? 'yes' : 'no'}`);
    },
    [setParams],
  );

  return useMemo(
    () => ({
      ...stepsData(isCreateOrder).find(
        (item) => item.curUrl === location.pathname,
      ),
      isConfirm,
      isCreateOrder,
      setStatus,
      stepStatus: params.get('completed') === 'yes',
    }),
    [isConfirm, isCreateOrder, location.pathname, params, setStatus],
  );
};
