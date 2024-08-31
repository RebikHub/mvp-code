import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/app/components/ui-kit/button/Button';
import { Checkbox } from '@/app/components/ui-kit/checkbox/Checkbox';

import api from '@/app/api/api';
import { useBaseMutation } from '@/app/api/hooks/useBaseMutation';
import { useBaseQuery } from '@/app/api/hooks/useBaseQuery';

import { RootPath } from '@/app/router/enum/enum';

import { useLocaleStore } from '@/app/store/localization';
import { useOrderStore } from '@/app/store/order';
import { useUserStore } from '@/app/store/user';

import { useText } from '@/app/services/hooks/useLocalization';
import {
  convertDateToReadable,
  createOrderDate,
} from '@/app/services/utils/converterDate';
import { getOfertaCreateOrder } from '@/app/services/utils/getTextOferta';
import { nearestOpeningConfirm } from '@/app/services/utils/nearestOpeningOrder';
import { valueForPlural } from '@/app/services/utils/plural';

import { Locale } from '@/app/types/enums';

import { useStepsData } from '../hooks/useStepsData';

import css from './OrderConfirm.module.scss';

export const OrderConfirm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [recipientsNames, setRecipientsNames] = useState<string[]>([]);
  const timer = useRef<NodeJS.Timeout>();

  const navigate = useNavigate();
  const { isCreateOrder } = useStepsData();

  const {
    condition_ids,
    condition_parameters,
    container_id,
    container_id_old,
    recipient_ids,
    messages,
    name,
    id,
    user_id,
    date_create,
    date_update,
  } = useOrderStore();
  const senderName = useUserStore.use.name();
  const locale = useLocaleStore.use.locale();

  const { data: recipients } = useBaseQuery(
    api.recipients.getRecipients,
    'get/recipients',
  );
  const { mutate: createOrder, isPending: isPendingCreate } = useBaseMutation(
    api.orders.postOrders,
    {
      invalidateQueryKey: 'get/orders',
      success: {
        text: 'toast.create.order',
      },
    },
  );
  const { mutate: updateOrder, isPending: isPendingUpdate } = useBaseMutation(
    api.orders.putOrdersUpdateSpecific,
    {
      invalidateQueryKey: 'get/orders',
      success: {
        text: 'toast.update.order',
      },
    },
  );

  const handleCreateOrder = () => {
    createOrder(
      {
        condition_ids,
        condition_parameters,
        container_id,
        recipient_ids,
        messages,
        name,
        oferta_text: getOfertaCreateOrder({
          sender: senderName,
          recipient: recipientsNames,
          order: name,
        }),
      },
      {
        onSuccess: () => {
          timer.current = setTimeout(() => {
            navigate(`/${RootPath.main}`);
          }, 1500);
        },
      },
    );
  };

  const handleUpdateOrder = () => {
    id &&
      updateOrder(
        {
          order_id: id,
          body: {
            condition_ids,
            condition_parameters,
            container_id,
            container_id_old,
            recipient_ids,
            messages,
            name,
            id,
            user_id,
            oferta_text: getOfertaCreateOrder({
              sender: senderName,
              recipient: recipientsNames,
              order: name,
            }),
          },
        },
        {
          onSuccess: () => {
            timer.current = setTimeout(() => {
              navigate(`/${RootPath.main}`);
            }, 1500);
          },
        },
      );
  };

  const openOrder = useMemo(
    () => nearestOpeningConfirm(condition_parameters),
    [condition_parameters],
  );

  useEffect(() => {
    if (recipients?.items) {
      const names: string[] = [];
      recipient_ids?.forEach((item) => {
        recipients?.items.forEach((recipient) => {
          if (recipient.id === item) {
            names.push(recipient.name);
          }
        });
      });
      setRecipientsNames(names);
    }
  }, [recipient_ids, recipients]);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className={css.container}>
      <div className={css.info}>
        <div>
          <FormattedMessage tagName="span" id="info.card.name" />
          <p>{name}</p>
        </div>
        <div>
          <FormattedMessage
            tagName="span"
            id="info.card.date"
            values={{
              n: isCreateOrder ? (
                <FormattedMessage id="shared.created" />
              ) : (
                <FormattedMessage id="shared.updated" />
              ),
            }}
          />
          <p>
            {isCreateOrder
              ? createOrderDate()
              : (date_update && convertDateToReadable(date_update)) ||
                (date_create && convertDateToReadable(date_create))}
          </p>
        </div>
        <div>
          <FormattedMessage tagName="span" id="info.card.recipients" />
          <p>{recipient_ids?.length || 0}</p>
        </div>
        <div>
          <FormattedMessage tagName="span" id="info.card.open.days" />
          <FormattedMessage
            tagName="p"
            id={openOrder.type}
            values={{
              n: valueForPlural(locale === Locale.rus, openOrder.value),
              v: openOrder.value,
            }}
          />
        </div>
      </div>
      <div className={css.oferta}>
        <p>
          <FormattedMessage id="oferta.text.first" /> <span>{senderName}</span>{' '}
          <FormattedMessage id="oferta.confirm.first" />{' '}
          <span>
            {recipientsNames.map((name, index) => (
              <Fragment key={name}>
                {name}
                {index === recipientsNames.length - 1 ? '' : ', '}
              </Fragment>
            ))}
          </span>{' '}
          <FormattedMessage id="oferta.confirm.second" /> <span>"{name}"</span>
          <FormattedMessage id="oferta.confirm.third" />
        </p>
        <FormattedMessage tagName="p" id="oferta.confirm.fourth" />
      </div>
      <div className={css.actions}>
        <Checkbox
          label={useText('input.confirm.oferta')}
          onClick={setIsChecked}
          size="large"
        />
        <Button
          label={useText(isCreateOrder ? 'button.send' : 'button.update')}
          color="green"
          className={css.button}
          disabled={!isChecked}
          onClick={isCreateOrder ? handleCreateOrder : handleUpdateOrder}
          isLoading={isPendingCreate || isPendingUpdate}
        />
      </div>
    </div>
  );
};
