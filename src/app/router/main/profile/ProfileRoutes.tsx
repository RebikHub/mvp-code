import { FC } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import { ProfileAccount } from '@/app/pages/main/profile/account/ProfileAccount';
import { Info } from '@/app/pages/main/profile/components/info/Info';
import { ProfileContainers } from '@/app/pages/main/profile/containers/ProfileContainers';
import { ProfileOrders } from '@/app/pages/main/profile/orders/ProfileOrders';
import { ProfileReceivedOrders } from '@/app/pages/main/profile/received-orders/ProfileReceivedOrders';
import { ProfileRecipients } from '@/app/pages/main/profile/recipients/ProfileRecipients';
import { ProfileTariff } from '@/app/pages/main/profile/tariff/ProfileTariff';

import { ProfilePath, RootPath } from '../../enum/enum';

type Props = {
  isPhones?: boolean;
};

export const ProfileRoutes: FC<Props> = ({ isPhones }) =>
  useRoutes([
    {
      path: ProfilePath.base,
      element: isPhones ? <Info /> : <Navigate to={ProfilePath.account} />,
    },
    {
      path: ProfilePath.account,
      element: <ProfileAccount />,
    },
    {
      path: ProfilePath.receivedOrders,
      element: <ProfileReceivedOrders />,
    },
    {
      path: ProfilePath.recipients,
      element: <ProfileRecipients />,
    },
    {
      path: ProfilePath.containers,
      element: <ProfileContainers />,
    },
    {
      path: ProfilePath.orders,
      element: <ProfileOrders />,
    },
    {
      path: ProfilePath.tariff,
      element: <ProfileTariff />,
    },
    {
      path: '/*',
      element: <Navigate to={`/${RootPath.error}`} />,
    },
  ]);
