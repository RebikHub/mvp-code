import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { Loader } from '@/app/components/ui-kit/loader/Loader';

import api from '@/app/api/api';
import { useBaseMutation } from '@/app/api/hooks/useBaseMutation';
import { useBaseQuery } from '@/app/api/hooks/useBaseQuery';

import { useLocaleStore } from '@/app/store/localization';
import { useUserStore } from '@/app/store/user';

import { convertDateToReadable } from '@/app/services/utils/converterDate';
import { nearestOpeningOrders } from '@/app/services/utils/nearestOpeningOrder';
import { valueForPlural } from '@/app/services/utils/plural';

import { Locale } from '@/app/types/enums';

import css from './Info.module.scss';

export const Info = () => {
  const updateLastVisit = useUserStore.use.updateLastVisit();
  const lastVisit = useUserStore.use.date_last_visit?.();
  const userId = useUserStore.use.id();
  const locale = useLocaleStore.use.locale();

  const { data: recipients, isPending: isPendingRecipients } = useBaseQuery(
    api.recipients.getRecipients,
    'get/recipients',
  );
  const { data: orders, isPending: isPendingOrders } = useBaseQuery(
    api.orders.getOrders,
    'get/orders',
  );
  const { data: containers, isPending: isPendingContainers } = useBaseQuery(
    api.containers.getContainers,
    'get/containers',
  );
  const { mutate, isPending: isPendingLastVisit } = useBaseMutation(
    api.users.putUsersDateLastVisit,
  );

  const handleUpdateLastVisit = () => {
    mutate(
      { user_id: userId },
      {
        onSuccess: (data) => {
          if (data) {
            updateLastVisit(data?.data?.date_last_visit);
          }
        },
      },
    );
  };

  const openOrder = useMemo(
    () => nearestOpeningOrders(orders?.items),
    [orders?.items],
  );

  return (
    <div className={css.info}>
      <div className={css.item}>
        {lastVisit && !isPendingLastVisit ? (
          <h3>{convertDateToReadable(lastVisit)}</h3>
        ) : (
          <Loader size={24} />
        )}
        <div className={css.update}>
          <FormattedMessage tagName="p" id="info.lastVisit" />
          <div className={css.btn} onClick={handleUpdateLastVisit}>
            <FormattedMessage id="info.update" />
          </div>
        </div>
      </div>
      <div className={css.item}>
        {isPendingOrders ? (
          <Loader size={24} />
        ) : (
          <FormattedMessage
            tagName="h3"
            id={openOrder.type}
            values={{
              n: valueForPlural(locale === Locale.rus, openOrder.value),
              v: openOrder.value,
            }}
          />
        )}
        <FormattedMessage tagName="p" id="info.opening" />
      </div>
      <div className={css.item}>
        {isPendingOrders ? (
          <Loader size={24} />
        ) : (
          <h3>{orders?.items.length ?? 0}</h3>
        )}
        <FormattedMessage
          tagName="p"
          id="info.orders"
          values={{
            n: valueForPlural(locale === Locale.rus, orders?.items.length ?? 0),
          }}
        />
      </div>
      <div className={css.item}>
        {isPendingRecipients ? (
          <Loader size={24} />
        ) : (
          <h3>{recipients?.items.length ?? 0}</h3>
        )}
        <FormattedMessage
          tagName="p"
          id="info.recipients"
          values={{
            n: valueForPlural(
              locale === Locale.rus,
              recipients?.items.length ?? 0,
            ),
          }}
        />
      </div>
      <div className={css.item}>
        {isPendingContainers ? (
          <Loader size={24} />
        ) : (
          <h3>{containers?.items.length ?? 0}</h3>
        )}
        <FormattedMessage
          tagName="p"
          id="info.containers"
          values={{
            n: valueForPlural(
              locale === Locale.rus,
              containers?.items.length ?? 0,
            ),
          }}
        />
      </div>
    </div>
  );
};
