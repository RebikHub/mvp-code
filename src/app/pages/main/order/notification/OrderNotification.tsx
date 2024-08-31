import { useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useNextStep } from '@/app/components/ui-kit/steps/hooks/useNextStep';
import { TextArea } from '@/app/components/ui-kit/text-area/TextArea';

import { ButtonsGroup } from '../components/buttons-group/ButtonsGroup';

import { useOrderStore } from '@/app/store/order';

import { useFormManagement } from '@/app/services/hooks/useFormManagement';
import { useText } from '@/app/services/hooks/useLocalization';
import { validateDefaultRequired } from '@/app/services/validators/validators';

import { useStepsData } from '../hooks/useStepsData';

import css from './OrderNotification.module.scss';

export const OrderNotification = () => {
  const navigate = useNavigate();
  const { nextUrl } = useStepsData();
  const { formState, setValue, onSubmit, isValid, trigger, getValues } =
    useFormManagement();

  const messages = useOrderStore.use.messages();
  const setOrderMessages = useOrderStore.use.setOrderMessages();

  const handleSubmit = (data: FieldValues) => {
    if (data) {
      setOrderMessages({
        sms: data.sms,
        email: data.message,
      });
      nextUrl && navigate(nextUrl);
    }
  };

  useEffect(() => {
    messages.sms && setValue('sms', messages.sms);
    messages.email && setValue('message', messages.email);
    if (messages.email || messages.sms) {
      trigger();
    }
  }, [messages.email, messages.sms, setValue, trigger]);

  useNextStep({
    status: isValid,
    values: getValues,
    handler: handleSubmit,
  });

  return (
    <form className={css.container} onSubmit={onSubmit(handleSubmit)}>
      <TextArea
        label={useText('input.notification.sms')}
        placeholder={useText('input.notification.sms')}
        name="sms"
        formState={formState}
        validate={validateDefaultRequired}
      />
      <TextArea
        label={useText('input.notification.message')}
        placeholder={useText('input.notification.message')}
        name="message"
        formState={formState}
        validate={validateDefaultRequired}
      />
      <ButtonsGroup disabled={!isValid} />
    </form>
  );
};
