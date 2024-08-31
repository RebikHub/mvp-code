import { useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { Modal } from '@/app/components/modal/Modal';
import { Button } from '@/app/components/ui-kit/button/Button';
import { Input } from '@/app/components/ui-kit/input/Input';
import { Loader } from '@/app/components/ui-kit/loader/Loader';
import { useNextStep } from '@/app/components/ui-kit/steps/hooks/useNextStep';

import { Recipient } from '../../components/recipient/Recipient';
import { ButtonsGroup } from '../components/buttons-group/ButtonsGroup';

import api from '@/app/api/api';
import { useBaseMutation } from '@/app/api/hooks/useBaseMutation';
import { useBaseQuery } from '@/app/api/hooks/useBaseQuery';

import { useOrderStore } from '@/app/store/order';

import { useDisplayErrorToast } from '@/app/services/hooks/useDisplayErrorToast';
import { useFormManagement } from '@/app/services/hooks/useFormManagement';
import { useText } from '@/app/services/hooks/useLocalization';
import {
  validateDefaultRequired,
  validateEmail,
  validatePhone,
} from '@/app/services/validators/validators';

import { useStepsData } from '../hooks/useStepsData';

import css from './OrderRecipients.module.scss';

export const OrderRecipients = () => {
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();
  const { nextUrl, stepStatus } = useStepsData();
  const { formState, onSubmit, reset, getValues } = useFormManagement();
  const { displayErrorToast } = useDisplayErrorToast();

  const recipientIds = useOrderStore.use.recipient_ids?.();
  const setRecipientId = useOrderStore.use.setRecipientId();
  const unsetRecipientId = useOrderStore.use.unsetRecipientId();

  const { data: recipients, isPending } = useBaseQuery(
    api.recipients.getRecipients,
    'get/recipients',
  );
  const { mutate: createRecipient, isPending: isPendingCreate } =
    useBaseMutation(api.recipients.postRecipients, {
      invalidateQueryKey: 'get/recipients',
      success: {
        text: 'toast.create.recipient',
      },
    });

  const handleModalAction = (data: FieldValues) => {
    if (data) {
      createRecipient(
        {
          email: data.email,
          name: data.name,
          phone: data.phone,
        },
        {
          onSuccess: () => {
            setIsVisible(false);
            reset();
          },
        },
      );
    }
  };

  const handleCheckRecipient = ({
    id,
    checked,
  }: {
    id: string;
    checked: boolean;
  }) => {
    if (id && checked) {
      setRecipientId(id);
    } else if (id) {
      unsetRecipientId(id);
    }
  };

  const handleNextStep = () => {
    if (recipientIds?.length === 0) {
      displayErrorToast('error.toast.recipient');
    } else {
      nextUrl && navigate(nextUrl);
    }
  };

  const handleModalClose = () => {
    reset();
    setIsVisible(false);
  };

  useEffect(() => {
    if (recipients?.items) {
      const allRecipients = recipients?.items.map((item) => item.id);
      recipientIds?.forEach((id) => {
        if (!allRecipients.includes(id)) {
          unsetRecipientId(id);
        }
      });
    }
  }, [recipientIds, recipients, unsetRecipientId]);

  useNextStep({
    status: !!recipientIds?.length,
    values: getValues,
    handler: handleNextStep,
  });

  return (
    <div className={css.container}>
      <Button
        className={css.button}
        color="green"
        label={useText('button.add.recipient')}
        onClick={() => setIsVisible(true)}
      />
      {isPending ? (
        <Loader />
      ) : recipients?.items.length ? (
        recipients.items.map((recipient) => (
          <Recipient
            key={recipient.id}
            withCheckbox={true}
            id={recipient.id}
            name={recipient.name}
            phone={recipient.phone}
            email={recipient.email}
            checked={recipientIds?.includes(recipient.id)}
            handleCheckRecipient={handleCheckRecipient}
          />
        ))
      ) : (
        <div className={css.empty}>
          <FormattedMessage id="page.profile.recipients" />
        </div>
      )}

      <ButtonsGroup
        type="button"
        disabled={!stepStatus}
        onNextStep={handleNextStep}
      />

      <Modal
        isOpen={isVisible}
        btnLabel={useText('button.add')}
        title={useText('modal.recipient.title')}
        onAction={onSubmit(handleModalAction)}
        onClose={handleModalClose}
        isLoading={isPendingCreate}
      >
        <Input
          name="name"
          label={useText('input.recipient')}
          placeholder={useText('input.recipient')}
          formState={formState}
          validate={validateDefaultRequired}
        />
        <Input
          name="phone"
          label={useText('input.phoneNumber')}
          placeholder={useText('input.phoneNumber')}
          formState={formState}
          validate={validatePhone}
        />
        <Input
          name="email"
          label={useText('input.email')}
          placeholder={useText('input.email')}
          formState={formState}
          validate={validateEmail}
        />
      </Modal>
    </div>
  );
};
