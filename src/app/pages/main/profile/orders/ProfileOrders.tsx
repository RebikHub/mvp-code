import cn from 'classnames';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { Icon } from '@/app/components/ui-kit/icon/Icon';
import { Input } from '@/app/components/ui-kit/input/Input';
import { Loader } from '@/app/components/ui-kit/loader/Loader';

import { ExtendedOrder } from '../components/extended-order/ExtendedOrder';

import api from '@/app/api/api';
import { useBaseQuery } from '@/app/api/hooks/useBaseQuery';
import { IOrder } from '@/app/api/types';

import { MainPath, RootPath } from '@/app/router/enum/enum';

import { useFormManagement } from '@/app/services/hooks/useFormManagement';
import { useText } from '@/app/services/hooks/useLocalization';
import { useSearchInputForm } from '@/app/services/hooks/useSearchInputForm';

import { TOrderStatus } from '@/app/types/types';

import add from '@/assets/images/icon-add.svg';

import css from './ProfileOrders.module.scss';

export const ProfileOrders = () => {
  const [activeSort, setActiveSort] = useState<TOrderStatus>('активные');
  const [listOrder, setListOrder] = useState<IOrder[]>([]);

  const { formState } = useFormManagement();
  const { searchValue, handleSearch, reset } = useSearchInputForm(
    formState,
    'search',
  );
  const inputSearchText = useText('input.search.order');

  const { data: ordersActive, isPending: isLoadingOrdersActive } = useBaseQuery(
    api.orders.getOrders,
    'get/orders',
  );
  const { data: ordersInactive, isPending: isLoadingOrdersInactive } =
    useBaseQuery(api.orders.getOrdersInactive, 'get/orders/inactive');
  const { data: ordersOpened, isPending: isLoadingOrdersOpened } = useBaseQuery(
    api.orders.getOrdersOpened,
    'get/orders/opened',
  );

  const switchSort = (sort: TOrderStatus) => {
    setActiveSort(sort);
    reset();
    switch (sort) {
      case 'исполненные':
        setListOrder(ordersOpened?.items ? ordersOpened.items : []);
        break;
      case 'активные':
        setListOrder(ordersActive?.items ? ordersActive.items : []);
        break;
      case 'неактивные':
        setListOrder(ordersInactive?.items ? ordersInactive.items : []);
        break;
      default:
        setListOrder([]);
        break;
    }
  };

  const isLoading =
    isLoadingOrdersActive || isLoadingOrdersInactive || isLoadingOrdersOpened;
  const isListLength =
    !!ordersActive?.items || !!ordersInactive?.items || !!ordersOpened?.items;

  useEffect(() => {
    if (ordersActive?.items) {
      setListOrder(ordersActive?.items);
    } else if (ordersOpened?.items) {
      setActiveSort('исполненные');
      setListOrder(ordersOpened?.items);
    } else if (ordersInactive?.items) {
      setActiveSort('неактивные');
      setListOrder(ordersInactive?.items);
    } else {
      setListOrder([]);
    }
  }, [ordersActive?.items, ordersInactive?.items, ordersOpened?.items]);

  return (
    <div className={css.container}>
      {isLoading ? (
        <Loader />
      ) : isListLength ? (
        <>
          <div className={css.sort}>
            <Input
              isSearch
              placeholder={inputSearchText}
              size="short"
              name="search"
              formState={formState}
              onSearch={handleSearch}
            />
            <div className={css.buttons}>
              <button
                type="button"
                className={cn(css.btn, {
                  [css.btn_active]: activeSort === 'активные',
                })}
                onClick={() => switchSort('активные')}
              >
                <FormattedMessage id="shared.active" />
              </button>
              <button
                type="button"
                className={cn(css.btn, {
                  [css.btn_active]: activeSort === 'неактивные',
                })}
                onClick={() => switchSort('неактивные')}
              >
                <FormattedMessage id="shared.inactive" />
              </button>
              <button
                type="button"
                className={cn(css.btn, {
                  [css.btn_active]: activeSort === 'исполненные',
                })}
                onClick={() => switchSort('исполненные')}
              >
                <FormattedMessage id="shared.fulfilled" />
              </button>
            </div>
          </div>

          <div className={css.list}>
            {listOrder
              .filter(
                ({ name }) =>
                  !searchValue.trim() ||
                  name
                    .trim()
                    .toLocaleLowerCase()
                    .includes(searchValue.trim().toLocaleLowerCase()),
              )
              .map((order) => (
                <ExtendedOrder
                  key={order.id}
                  status={activeSort}
                  name={order.name}
                  recipients={order?.recipient_ids?.length}
                  dateCreate={order?.date_create}
                  params={order.condition_parameters}
                />
              ))}
          </div>
        </>
      ) : (
        <div className={css.empty}>
          <FormattedMessage tagName="p" id="page.main.order" />
          <Link to={`/${RootPath.main}/${MainPath.orderCreate}`}>
            <Icon size={51} image={add} />
          </Link>
        </div>
      )}
    </div>
  );
};
