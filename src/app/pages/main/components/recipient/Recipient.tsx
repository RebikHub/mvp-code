import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { Modal } from '@/app/components/modal/Modal';
import { Checkbox } from '@/app/components/ui-kit/checkbox/Checkbox';
import { Icon } from '@/app/components/ui-kit/icon/Icon';
import { Input } from '@/app/components/ui-kit/input/Input';
import recipient from '@/app/components/ui-kit/svg/recipient';

import api from '@/app/api/api';
import { useBaseMutation } from '@/app/api/hooks/useBaseMutation';

import { useFormManagement } from '@/app/services/hooks/useFormManagement';
import { useText } from '@/app/services/hooks/useLocalization';
import { useScreenWidth } from '@/app/services/hooks/useScreenWidth';
import { validateDefaultRequired } from '@/app/services/validators/validators';

import css from './Recipient.module.scss';

type Props = {
  name: string;
  phone: string;
  email: string;
  id?: string;
  cases?: number;
  withCheckbox?: boolean;
  checked?: boolean;
  handleCheckRecipient?: ({
    id,
    checked,
  }: {
    id: string;
    checked: boolean;
  }) => void;
};

export const Recipient: FC<Props> = ({
  id,
  name,
  phone,
  email,
  cases = 0,
  withCheckbox = false,
  checked = false,
  handleCheckRecipient,
}) => {
  const [colorTheme, setColorTheme] = useState('dark');
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleDelete, setIsVisibleDelete] = useState(false);

  const { formState, onSubmit, setValue, reset } = useFormManagement();
  const { isPhones } = useScreenWidth();

  const { mutate: editRecipient, isPending: isPendingEdit } = useBaseMutation(
    api.recipients.putRecipients,
    {
      invalidateQueryKey: 'get/recipients',
      success: {
        text: 'toast.edit.recipient',
      },
    },
  );
  const { mutate: deleteRecipient, isPending: isPendingDelete } =
    useBaseMutation(api.recipients.deleteRecipients, {
      invalidateQueryKey: 'get/recipients',
      success: {
        text: 'toast.delete.recipient',
      },
    });

  const handleCheck = (value: boolean) => {
    id && handleCheckRecipient?.({ id, checked: value });
  };

  const handleEditRecipient = () => {
    setIsVisible(true);
    setValue('name', name);
    setValue('phone', phone);
    setValue('email', email);
  };

  const handleModalAction = (data: FieldValues) => {
    if (data && id) {
      editRecipient(
        {
          recipient_id: id,
          body: {
            email: data.email,
            name: data.name,
            phone: data.phone,
          },
        },
        {
          onSuccess: () => {
            setIsVisible(false);
          },
        },
      );
    }
  };

  const handleModalDeleteAction = () => {
    id &&
      deleteRecipient(
        { recipient_id: id },
        {
          onSuccess: () => {
            setIsVisibleDelete(false);
          },
        },
      );
  };

  const handleModalClose = () => {
    reset();
    setIsVisible(false);
  };

  useEffect(() => {
    if (checked) {
      setColorTheme('light');
    } else {
      setColorTheme('dark');
    }
  }, [checked]);

  return (
    <div className={css.recipient}>
      <div className={css.info}>
        {withCheckbox && <Checkbox check={checked} onClick={handleCheck} />}
        <div className={css.content}>
          <p
            className={cn(css.name, { [css.name_dark]: colorTheme === 'dark' })}
          >
            {name}
          </p>
          <div className={css.container}>
            <div className={css.title}>
              <p
                className={cn(css.label, {
                  [css.label_dark]: colorTheme === 'dark',
                })}
              >
                <FormattedMessage id="shared.phone" />
              </p>
              {isPhones && (
                <p
                  className={cn(css.text, {
                    [css.text_dark]: colorTheme === 'dark',
                  })}
                >
                  {phone}
                </p>
              )}
              <p
                className={cn(css.label, {
                  [css.label_dark]: colorTheme === 'dark',
                })}
              >
                <FormattedMessage id="shared.email" />
              </p>
              {isPhones && (
                <p
                  className={cn(css.text, {
                    [css.text_dark]: colorTheme === 'dark',
                  })}
                >
                  {email}
                </p>
              )}
            </div>
            {!isPhones && (
              <div className={css.body}>
                <p
                  className={cn(css.text, {
                    [css.text_dark]: colorTheme === 'dark',
                  })}
                >
                  {phone}
                </p>
                <p
                  className={cn(css.text, {
                    [css.text_dark]: colorTheme === 'dark',
                  })}
                >
                  {email}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={css.action}>
        <div
          className={cn(css.cases, { [css.cases_dark]: colorTheme === 'dark' })}
        >
          <FormattedMessage id="shared.orders" /> {cases}
        </div>
        <div className={css.icons}>
          <Icon
            isRem={!isPhones}
            svg={recipient.edit}
            size={24}
            color={colorTheme === 'dark' ? '#6B6B6B' : 'white'}
            onClick={handleEditRecipient}
          />

          <Icon
            isRem={!isPhones}
            svg={recipient.remove}
            size={18}
            color={colorTheme === 'dark' ? '#6B6B6B' : 'white'}
            onClick={() => setIsVisibleDelete(true)}
          />
        </div>
      </div>

      <Modal
        isOpen={isVisible}
        btnLabel={useText('button.edit')}
        title={useText('modal.title.edit.recipient')}
        disabled={!formState.formState.isValid}
        onAction={onSubmit(handleModalAction)}
        onClose={handleModalClose}
        isLoading={isPendingEdit}
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
          validate={validateDefaultRequired}
        />
        <Input
          name="email"
          label={useText('input.email')}
          placeholder={useText('input.email')}
          formState={formState}
          validate={validateDefaultRequired}
        />
      </Modal>

      <Modal
        isOpen={isVisibleDelete}
        btnLabel={useText('button.confirm')}
        title={useText('modal.recipient.delete')}
        onAction={handleModalDeleteAction}
        onClose={() => setIsVisibleDelete(false)}
        isLoading={isPendingDelete}
      >
        <FormattedMessage tagName="div" id="modal.delete" />
      </Modal>
    </div>
  );
};
