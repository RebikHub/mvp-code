import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { Logo } from '@/app/components/logo/Logo';
import { ToggleLang } from '@/app/components/toggle-lang/ToggleLang';

import { MobileLayout } from '../../layout/MobileLayout';

import { AuthRoutes } from '@/app/router/auth/AuthRoutes';

import { useScreenWidth } from '@/app/services/hooks/useScreenWidth';

import css from './AuthLayout.module.scss';

const AuthLayout = () => {
  const path = useLocation();
  const { isPhones } = useScreenWidth();

  if (isPhones) {
    return (
      <MobileLayout>
        <AuthRoutes isPhones={isPhones} />
      </MobileLayout>
    );
  }

  return (
    <div className={css.container}>
      {path.pathname === '/auth/login' || path.pathname === '/auth/signup' ? (
        <AuthRoutes />
      ) : (
        <div className={css.layout}>
          <header>
            <ToggleLang />
            <Link to="/">
              <Logo />
            </Link>
          </header>

          <main>
            <AuthRoutes />
          </main>
        </div>
      )}
    </div>
  );
};

export default AuthLayout;
