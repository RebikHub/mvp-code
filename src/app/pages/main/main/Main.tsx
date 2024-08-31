import { FC, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { registerSyncOpenOrder } from '@/service-worker/registerSyncOpenOrder';

import { Icon } from '@/app/components/ui-kit/icon/Icon';
import { Loader } from '@/app/components/ui-kit/loader/Loader';

import { Order } from '../components/order/Order';
import { Profile } from '../components/profile/Profile';
import { Info } from '../profile/components/info/Info';

import api from '@/app/api/api';
import { useBaseQuery } from '@/app/api/hooks/useBaseQuery';

import { MainPath, OrderPath, RootPath } from '@/app/router/enum/enum';

import { nearestOpeningTimestamp } from '@/app/services/utils/nearestOpeningOrder';

import add from '@/assets/images/icon-add.svg';

import css from './Main.module.scss';

type Props = {
  isPhones?: boolean;
};

const Main: FC<Props> = ({ isPhones }) => {
  const { data: orders, isPending } = useBaseQuery(
    api.orders.getOrders,
    'get/orders',
  );

  useEffect(() => {
    const timestamp = nearestOpeningTimestamp(orders?.items);
    if (timestamp) {
      registerSyncOpenOrder(timestamp);
    }
  }, [orders?.items]);

  if (isPhones) {
    return (
      <div className={css.main}>
        <Profile className={css.profile} />

        <FormattedMessage tagName="h2" id="page.main.title" />

        <div className={css.list}>
          {isPending ? (
            <Loader />
          ) : orders?.items.length ? (
            orders.items.map((order) => <Order key={order.id} order={order} />)
          ) : (
            <div className={css.empty}>
              <FormattedMessage tagName="p" id="page.main.order" />
              <Link
                to={`/${RootPath.main}/${MainPath.orderCreate}/${OrderPath.title}`}
              >
                <Icon isRem={!isPhones} size={51} image={add} />
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={css.main}>
      <div className={css.left}>
        <Profile />
        <Info />
      </div>

      <div className={css.right}>
        <FormattedMessage tagName="h2" id="page.main.title" />

        <div className={css.list}>
          {isPending ? (
            <Loader />
          ) : orders?.items.length ? (
            orders.items.map((order) => <Order key={order.id} order={order} />)
          ) : (
            <div className={css.empty}>
              <FormattedMessage tagName="p" id="page.main.order" />
              <Link
                to={`/${RootPath.main}/${MainPath.orderCreate}/${OrderPath.title}`}
              >
                <Icon size={51} image={add} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
