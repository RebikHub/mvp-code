import { useEffect } from 'react';
import { FieldValues, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Input } from '@/app/components/ui-kit/input/Input';
import { useNextStep } from '@/app/components/ui-kit/steps/hooks/useNextStep';

import { ButtonsGroup } from '../components/buttons-group/ButtonsGroup';

import { useOrderStore } from '@/app/store/order';

import { useFormManagement } from '@/app/services/hooks/useFormManagement';
import { useText } from '@/app/services/hooks/useLocalization';
import { validateDefaultRequired } from '@/app/services/validators/validators';

import { useStepsData } from '../hooks/useStepsData';

export const OrderTitle = () => {
  const navigate = useNavigate();
  const { nextUrl, setStatus } = useStepsData();
  const { formState, setValue, onSubmit, getValues } = useFormManagement();
  const orderName = useOrderStore.use.name();
  const setOrderName = useOrderStore.use.setOrderName();
  const orderNameField = useWatch({
    name: 'title',
    control: formState.control,
  });

  const handleSubmit = (data: FieldValues) => {
    if (orderName !== data.title) {
      setOrderName(data.title);
    }

    if (nextUrl) {
      navigate(nextUrl);
    }
  };

  useEffect(() => {
    if (orderName) {
      setValue('title', orderName);
    }
  }, [orderName, setValue]);

  useEffect(() => {
    setStatus(orderNameField);
  }, [orderNameField, setStatus]);

  useNextStep({
    status: orderNameField,
    values: getValues,
    handler: handleSubmit,
  });

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Input
        name="title"
        label={useText('input.title.order')}
        placeholder={useText('input.title.order')}
        validate={validateDefaultRequired}
        formState={formState}
      />
      <ButtonsGroup disabled={!orderNameField} />
    </form>
  );
};
