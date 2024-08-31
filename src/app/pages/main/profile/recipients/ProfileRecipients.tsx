import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { Modal } from '@/app/components/modal/Modal';
import { Button } from '@/app/components/ui-kit/button/Button';
import { Input } from '@/app/components/ui-kit/input/Input';
import { Loader } from '@/app/components/ui-kit/loader/Loader';

import { Recipient } from '../../components/recipient/Recipient';

import api from '@/app/api/api';
import { useBaseMutation } from '@/app/api/hooks/useBaseMutation';
import { useBaseQuery } from '@/app/api/hooks/useBaseQuery';

import { useFormManagement } from '@/app/services/hooks/useFormManagement';
import { useText } from '@/app/services/hooks/useLocalization';
import { useSearchInputForm } from '@/app/services/hooks/useSearchInputForm';
import {
  validateDefaultRequired,
  validateEmail,
  validatePhone,
} from '@/app/services/validators/validators';

import css from './ProfileRecipients.module.scss';

export const ProfileRecipients = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { formState, onSubmit, reset } = useFormManagement();
  const { searchValue, searchInput, handleSearch } = useSearchInputForm(
    formState,
    'search',
  );

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

  const handleModalClose = () => {
    reset();
    setIsVisible(false);
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <Input
          isSearch
          placeholder={useText('input.search.recipient')}
          size="short"
          name="search"
          formState={formState}
          onSearch={handleSearch}
        />
        <Button
          className={css.button}
          color="green"
          label={useText('button.add.recipient')}
          onClick={() => setIsVisible(true)}
        />
      </div>
      {isPending ? (
        <Loader />
      ) : recipients?.items.length ? (
        searchInput ? (
          <>
            {recipients.items
              .filter((item) =>
                item.name.trim().toLocaleLowerCase().includes(searchValue),
              )
              .map((recipient) => (
                <Recipient
                  key={recipient.id}
                  id={recipient.id}
                  name={recipient.name}
                  phone={recipient.phone}
                  email={recipient.email}
                  checked={true}
                />
              ))}
          </>
        ) : (
          <>
            {recipients.items.map((recipient) => (
              <Recipient
                key={recipient.id}
                id={recipient.id}
                name={recipient.name}
                phone={recipient.phone}
                email={recipient.email}
                checked={true}
              />
            ))}
          </>
        )
      ) : (
        <div className={css.empty}>
          <FormattedMessage id="page.profile.recipients" />
        </div>
      )}

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
