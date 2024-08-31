import cn from 'classnames';
import { FC, useMemo, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { Modal } from '@/app/components/modal/Modal';
import { Icon } from '@/app/components/ui-kit/icon/Icon';
import { InfoCard } from '@/app/components/ui-kit/info-card/InfoCard';
import { Input } from '@/app/components/ui-kit/input/Input';
import { TextArea } from '@/app/components/ui-kit/text-area/TextArea';

import api from '@/app/api/api';
import { useBaseMutation } from '@/app/api/hooks/useBaseMutation';
import { IConditionParameters } from '@/app/api/types';

import { useLocaleStore } from '@/app/store/localization';
import { useUserStore } from '@/app/store/user';

import { useFormManagement } from '@/app/services/hooks/useFormManagement';
import { useText } from '@/app/services/hooks/useLocalization';
import { convertDateToReadable } from '@/app/services/utils/converterDate';
import {
  currentStatusOrder,
  nearestOpeningConfirm,
} from '@/app/services/utils/nearestOpeningOrder';
import { valueForPlural } from '@/app/services/utils/plural';
import {
  validateDefaultRequired,
  validateEmailWithoutRequired,
  validatePhoneWithoutRequired,
  validateText,
} from '@/app/services/validators/validators';

import { Locale } from '@/app/types/enums';
import { TOrderStatus } from '@/app/types/types';

import fileImage from '@/assets/images/container-file.svg';
import modalSend from '@/assets/images/modal-send.svg';

import css from './ExtendedOrder.module.scss';

type Props = {
  label?: string;
  status: TOrderStatus;
  name: string;
  recipients?: number;
  dateCreate?: string;
  dateOpen?: string;
  params?: IConditionParameters;
};

export const ExtendedOrder: FC<Props> = ({
  status,
  name,
  recipients,
  dateCreate,
  dateOpen,
  params,
}) => {
  const isActive = status === 'активные';
  const [isVisibleContactUsModal, setIsVisibleContactUsModal] = useState(false);
  const [isVisibleSendModal, setIsVisibleSendModal] = useState(false);
  const id = useUserStore.use.id();
  const { formState, onSubmit, reset } = useFormManagement();

  const locale = useLocaleStore.use.locale();

  const { mutate, isPending } = useBaseMutation(
    api.feedback.postFeedbackTickets,
  );

  const switchStatus = (status: TOrderStatus) => {
    switch (status) {
      case 'активные':
        return {
          label: 'shared.label.active',
          status: 'order.label',
        };
      case 'неактивные':
        return {
          label: 'shared.label.inactive',
          status: 'shared.status.deleted',
        };
      default:
        return {
          label: 'shared.label.fulfilled',
          status: 'shared.status.fulfilled',
        };
    }
  };

  const handleModalContactUsAction = (data: FieldValues) => {
    if (data) {
      mutate(
        {
          title: 'Запрос документов',
          user_id: id,
          username: data.username,
          first_message: data.message,
          contacts: {
            phone: data.phone,
            email: data.email,
            nickname: data.nickname,
          },
        },
        {
          onSuccess: () => {
            setIsVisibleContactUsModal(false);
            setIsVisibleSendModal(true);
            reset();
          },
        },
      );
    }
  };

  const orderStatus = useMemo(() => {
    const status =
      params && dateCreate && currentStatusOrder(params, dateCreate);

    if (!status) {
      return {
        first: true,
        second: false,
        third: false,
        fourth: false,
      };
    }

    return {
      first: status > 0,
      second: status > 24,
      third: status > 49,
      fourth: status > 74,
    };
  }, [dateCreate, params]);

  const openOrder = useMemo(
    () => params && nearestOpeningConfirm(params),
    [params],
  );

  return (
    <>
      <div className={cn(css.container, { [css.container_active]: isActive })}>
        <span className={cn(css.label, { [css.label_active]: isActive })}>
          <FormattedMessage id={switchStatus(status).label} />
        </span>
        <h5 className={css.title}>{name}</h5>
        <div className={css.body}>
          <div className={css.info}>
            <InfoCard
              className={css.info_card}
              name={name}
              recipients={recipients}
              dateCreated={convertDateToReadable(dateCreate)}
              dateOpen={dateOpen}
            />
          </div>
          <div className={css.section}>
            <div className={css.order}>
              <div>
                <div className={css.status}>
                  <p className={css.status_title}>
                    <FormattedMessage id={switchStatus(status).status} />
                  </p>
                  {isActive && openOrder && (
                    <p className={css.status_days}>
                      <FormattedMessage
                        id={openOrder.type}
                        values={{
                          n: valueForPlural(
                            locale === Locale.rus,
                            openOrder.value,
                          ),
                          v: openOrder.value,
                        }}
                      />
                    </p>
                  )}
                </div>
              </div>
              <div
                className={cn(css.circle, {
                  [css.circle_first]: orderStatus.first,
                  [css.circle_second]: orderStatus.second,
                  [css.circle_third]: orderStatus.third,
                  [css.circle_fourth]: orderStatus.fourth,
                  [css.circle_activated]: !isActive,
                })}
              />
            </div>
          </div>
        </div>
        <div className={css.footer}>
          <Icon size={24} image={fileImage} />
          <div
            className={css.request}
            onClick={() => setIsVisibleContactUsModal(true)}
          >
            <FormattedMessage id="order.request.doc" />
          </div>
        </div>
      </div>

      <Modal
        isOpen={isVisibleContactUsModal}
        btnLabel={useText('modal.submit')}
        title={useText('modal.contactUs.title')}
        onAction={onSubmit(handleModalContactUsAction)}
        onClose={() => setIsVisibleContactUsModal(false)}
        isLoading={isPending}
      >
        <Input
          label={useText('input.label.name')}
          placeholder={useText('input.placeholder.name')}
          formState={formState}
          name="username"
          validate={validateDefaultRequired}
        />
        <Input
          label={useText('input.phone')}
          placeholder={useText('input.phone')}
          formState={formState}
          name="phone"
          validate={validatePhoneWithoutRequired}
        />
        <Input
          label={useText('input.nickname')}
          placeholder={useText('input.nickname')}
          formState={formState}
          name="nickname"
          validate={validateText}
        />
        <Input
          label={useText('input.label.mail')}
          placeholder={useText('input.placeholder.mail')}
          formState={formState}
          name="email"
          validate={validateEmailWithoutRequired}
        />
        <TextArea
          label={useText('input.label.message')}
          placeholder={useText('input.placeholder.message')}
          formState={formState}
          name="message"
          validate={validateDefaultRequired}
        />
      </Modal>

      <Modal
        className={css.modalSend}
        isOpen={isVisibleSendModal}
        onClose={() => setIsVisibleSendModal(false)}
      >
        <Icon size={365} image={modalSend} />
        <FormattedMessage tagName="h2" id="modal.complete.title" />
        <p>
          <FormattedMessage id="modal.complete.tickets.first" />
          <br />
          <FormattedMessage id="modal.complete.tickets.second" />
        </p>
      </Modal>
    </>
  );
};
