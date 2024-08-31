import { useContext, useEffect } from 'react';
import { FieldValues, UseFormGetValues } from 'react-hook-form';

import { useStepsData } from '@/app/pages/main/order/hooks/useStepsData';

import { StepsContext } from '@/app/services/providers/StepsProvider';

export const useNextStep = ({
  status,
  values,
  handler,
}: {
  status: boolean;
  values: UseFormGetValues<FieldValues>;
  handler: (data: FieldValues) => void;
}) => {
  const value = useContext(StepsContext);
  const { setStatus } = useStepsData();

  useEffect(() => {
    setStatus(status);
  }, [status, setStatus]);

  useEffect(() => {
    value?.setData(values);
    value?.setHandle(handler);
  }, [handler, value, values]);
};
