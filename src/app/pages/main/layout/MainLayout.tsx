import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';

import { InstallPWA } from '@/app/components/install-pwa/InstallPWA';
import { Sidebar } from '@/app/components/sidebar/Sidebar';

import { MobileLayout } from '../../layout/MobileLayout';

import cognito from '@/app/api/cognito/cognito';
import { useGetUser } from '@/app/api/hooks/useGetUser';

import { MainRoutes } from '@/app/router/main/MainRoutes';

import { useLocaleStore } from '@/app/store/localization';
import { useOrderStore } from '@/app/store/order';
import { useUserStore } from '@/app/store/user';

import { useScreenWidth } from '@/app/services/hooks/useScreenWidth';
import storage from '@/app/services/utils/storage';

import css from './MainLayout.module.scss';

const MainLayout = () => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const { isPhones } = useScreenWidth();
  const clearUser = useUserStore.use.clearUser();
  const clearOrder = useOrderStore.use.clearOrder();
  const clearLang = useLocaleStore.use.clearLang();

  useGetUser(storage.userId() || '');

  const handleLogout = () => {
    cognito.signOut();
    queryClient.clear();
    clearUser();
    clearLang();
  };

  useEffect(() => {
    if (!location.pathname.includes('/main/order-')) {
      clearOrder();
    }
  }, [clearOrder, location.pathname]);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  if (isPhones) {
    return (
      <MobileLayout>
        <MainRoutes isPhones={isPhones} />
      </MobileLayout>
    );
  }

  return (
    <div className={css.container}>
      <Sidebar />
      <div className={css.main}>
        <MainRoutes />
        {location.pathname === '/main' && (
          <InstallPWA className={css.install} />
        )}
        <Link className={css.logout} to="/" onClick={handleLogout}>
          <FormattedMessage tagName="p" id="title.logout" />
        </Link>
      </div>
    </div>
  );
};

export default MainLayout;
