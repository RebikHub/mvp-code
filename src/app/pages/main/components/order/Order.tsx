import cn from 'classnames';
import { FC, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { Modal } from '@/app/components/modal/Modal';
import { Icon } from '@/app/components/ui-kit/icon/Icon';
import { InfoCard } from '@/app/components/ui-kit/info-card/InfoCard';

import api from '@/app/api/api';
import { useBaseMutation } from '@/app/api/hooks/useBaseMutation';
import { IOrder } from '@/app/api/types';

import { MainPath, OrderPath, RootPath } from '@/app/router/enum/enum';

import { useLocaleStore } from '@/app/store/localization';
import { useOrderStore } from '@/app/store/order';

import { useText } from '@/app/services/hooks/useLocalization';
import { convertDateToReadable } from '@/app/services/utils/converterDate';
import {
  currentStatusOrder,
  nearestOpeningConfirm,
  openingDate,
} from '@/app/services/utils/nearestOpeningOrder';
import { valueForPlural } from '@/app/services/utils/plural';

import { Locale } from '@/app/types/enums';

import basket from '@/assets/images/icon-sm-basket.svg';
import edit from '@/assets/images/icon-sm-edit.svg';
import info from '@/assets/images/icon-sm-info.svg';

import css from './Order.module.scss';

type Props = {
  order: IOrder;
};

export const Order: FC<Props> = ({ order }) => {
  const [isVisibleDelete, setIsVisibleDelete] = useState(false);
  const [isVisibleInfo, setIsVisibleInfo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const setOrder = useOrderStore.use.setOrder();
  const locale = useLocaleStore.use.locale();

  const { mutate, isPending } = useBaseMutation(
    api.orders.deleteOrdersDeleteSpecific,
    {
      invalidateQueryKey: 'get/orders',
      success: {
        text: 'toast.delete.order',
      },
    },
  );

  const handleOrderDelete = () => {
    setIsVisibleDelete(true);
  };

  const handleModalActionDelete = () => {
    order?.id &&
      mutate(
        {
          container_id: order.container_id,
          order_id: order?.id,
        },
        {
          onSuccess: () => {
            setIsVisibleDelete(false);
          },
        },
      );
  };

  const handleOrderInfo = () => {
    setIsVisibleInfo(true);
  };

  const orderStatus = useMemo(() => {
    const status =
      order.date_create &&
      currentStatusOrder(order.condition_parameters, order.date_create);

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
  }, [order.condition_parameters, order.date_create]);

  const openOrder = useMemo(
    () => nearestOpeningConfirm(order.condition_parameters),
    [order.condition_parameters],
  );

  return (
    <>
      <div className={css.container}>
        <div className={css.order}>
          <Link
            to={`/${RootPath.main}/${MainPath.orderEdit}/${OrderPath.title}`}
            onClick={() => setOrder(order)}
          >
            <Icon className={css.edit} size={51} image={edit} />
          </Link>
          <Icon
            className={css.info}
            size={51}
            image={info}
            onClick={handleOrderInfo}
          />
          <Icon
            className={css.basket}
            size={51}
            image={basket}
            onClick={handleOrderDelete}
          />
          <div className={css.name}>
            <p
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {order.name}
            </p>
            {isHovered && order.name.length > 10 && (
              <div className={css.tooltip}>{order.name}</div>
            )}

            <div
              className={cn(css.circle, {
                [css.circle_first]: orderStatus.first,
                [css.circle_second]: orderStatus.second,
                [css.circle_third]: orderStatus.third,
                [css.circle_fourth]: orderStatus.fourth,
              })}
            />
          </div>
        </div>

        <div className={css.opening}>
          <p className={css.opening_title}>
            <FormattedMessage id="order.label" />
          </p>
          <p className={css.opening_days}>
            <FormattedMessage
              id={openOrder.type}
              values={{
                n: valueForPlural(locale === Locale.rus, openOrder.value),
                v: openOrder.value,
              }}
            />
          </p>
        </div>
      </div>

      <Modal
        isOpen={isVisibleDelete}
        btnLabel={useText('button.confirm')}
        title={useText('title.delete')}
        onAction={handleModalActionDelete}
        onClose={() => setIsVisibleDelete(false)}
        isLoading={isPending}
      >
        <FormattedMessage tagName="div" id="modal.delete" />
      </Modal>

      <Modal
        className={css.modal}
        isOpen={isVisibleInfo}
        iconCloseSize={15}
        onClose={() => setIsVisibleInfo(false)}
      >
        <InfoCard
          name={order.name}
          recipients={order?.recipient_ids?.length}
          dateCreated={convertDateToReadable(order.date_create)}
          dateOpen={openingDate(order) ?? 'Контейнер отправлен'}
        />
      </Modal>
    </>
  );
};
