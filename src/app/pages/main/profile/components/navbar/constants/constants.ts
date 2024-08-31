import { MainPath, ProfilePath, RootPath } from '@/app/router/enum/enum';

const root = `/${RootPath.main}/${MainPath.profile}`;

export const listMenu = [
  {
    id: 0,
    label: 'navbar.account',
    path: `${root}/${ProfilePath.account}`,
  },
  {
    id: 1,
    label: 'navbar.received',
    path: `${root}/${ProfilePath.receivedOrders}`,
  },
  {
    id: 2,
    label: 'navbar.recipients',
    path: `${root}/${ProfilePath.recipients}`,
  },
  {
    id: 3,
    label: 'navbar.containers',
    path: `${root}/${ProfilePath.containers}`,
  },
  {
    id: 4,
    label: 'navbar.orders',
    path: `${root}/${ProfilePath.orders}`,
  },
  {
    id: 5,
    label: 'navbar.tariff',
    path: `${root}/${ProfilePath.tariff}`,
  },
];
