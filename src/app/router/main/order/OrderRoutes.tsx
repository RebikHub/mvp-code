import { Navigate, useRoutes } from 'react-router-dom';

import { OrderCondition } from '@/app/pages/main/order/condition/OrderCondition';
import { OrderConfirm } from '@/app/pages/main/order/confirm/OrderConfirm';
import { OrderContainers } from '@/app/pages/main/order/containers/OrderContainers';
import { OrderNotification } from '@/app/pages/main/order/notification/OrderNotification';
import { OrderRecipients } from '@/app/pages/main/order/recipients/OrderRecipients';
import { OrderTitle } from '@/app/pages/main/order/title/OrderTitle';

import { OrderPath, RootPath } from '../../enum/enum';

export const OrderRoutes = () =>
  useRoutes([
    {
      path: OrderPath.base,
      element: <Navigate to={OrderPath.title} />,
    },
    {
      path: OrderPath.title,
      element: <OrderTitle />,
    },
    {
      path: OrderPath.recipients,
      element: <OrderRecipients />,
    },
    {
      path: OrderPath.notification,
      element: <OrderNotification />,
    },
    {
      path: OrderPath.containers,
      element: <OrderContainers />,
    },
    {
      path: OrderPath.condition,
      element: <OrderCondition />,
    },

    {
      path: OrderPath.confirm,
      element: <OrderConfirm />,
    },
    {
      path: '/*',
      element: <Navigate to={`/${RootPath.error}`} />,
    },
  ]);
