import { FC } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import Main from '@/app/pages/main/main/Main';
import { OrderLayout } from '@/app/pages/main/order/layout/OrderLayout';
import { ProfileLayout } from '@/app/pages/main/profile/layout/ProfileLayout';

import { MainPath, RootPath } from '../enum/enum';

type Props = {
  isPhones?: boolean;
};

export const MainRoutes: FC<Props> = ({ isPhones }) =>
  useRoutes([
    {
      path: MainPath.base,
      element: <Main isPhones={isPhones} />,
    },
    {
      path: `${MainPath.orderCreate}/*`,
      element: <OrderLayout />,
    },
    {
      path: `${MainPath.orderEdit}/*`,
      element: <OrderLayout />,
    },
    {
      path: `${MainPath.profile}/*`,
      element: <ProfileLayout />,
    },
    {
      path: '/*',
      element: <Navigate to={`/${RootPath.error}`} />,
    },
  ]);
