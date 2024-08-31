import { useQueryClient } from '@tanstack/react-query';
import cn from 'classnames';
import { FC, ReactNode, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { InstallPWA } from '@/app/components/install-pwa/InstallPWA';
import { ToggleLang } from '@/app/components/toggle-lang/ToggleLang';
import { Icon } from '@/app/components/ui-kit/icon/Icon';

import cognito from '@/app/api/cognito/cognito';

import { AuthPath, MainPath, RootPath } from '@/app/router/enum/enum';

import { useLocaleStore } from '@/app/store/localization';
import { useUserStore } from '@/app/store/user';

import arrow from '@/assets/images/arrow-date-left.svg';
import badge from '@/assets/images/badge.png';
import menu from '@/assets/images/icon-menu.svg';
import big from '@/assets/images/logo-big.svg';

import { listMenu } from '../main/profile/components/navbar/constants/constants';

import css from './MobileLayout.module.scss';

type Props = {
  children: ReactNode;
};

export const MobileLayout: FC<Props> = ({ children }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const clearUser = useUserStore.use.clearUser();
  const clearLang = useLocaleStore.use.clearLang();

  const handleLogout = () => {
    setIsOpenMenu(false);
    navigate('/');
    cognito.signOut();
    queryClient.clear();
    clearUser();
    clearLang();
  };

  const handleMain = () => {
    setIsOpenMenu(false);
    navigate(`/${RootPath.main}`);
  };

  const handleProfile = () => {
    setIsOpenMenu(false);
    navigate(`/${RootPath.main}/${MainPath.profile}/`);
  };

  const handleLinkList = (path: string) => {
    setIsOpenMenu(false);
    navigate(path);
  };

  return (
    <>
      <div
        className={cn(css.home, {
          [css.home_registered]:
            location.pathname === `/${RootPath.auth}/${AuthPath.registered}`,
        })}
      >
        <header>
          <Link to="/">
            <Icon isRem={false} size={45} image={big} />
          </Link>
          <div className={css.actions}>
            {location.pathname.includes(`/${RootPath.auth}`) ||
            location.pathname === '/' ? (
              <ToggleLang />
            ) : (
              <div className={css.menu} onClick={() => setIsOpenMenu(true)}>
                <FormattedMessage tagName="p" id="shared.menu" />
                <Icon isRem={false} size={45} image={menu} />
              </div>
            )}
          </div>
        </header>
        {children}
        <footer>
          <InstallPWA className={css.install} />

          <Icon className={css.badge} width={235} height={20} image={badge} />
        </footer>
      </div>
      {isOpenMenu ? (
        <div className={css.background} onClick={() => setIsOpenMenu(false)}>
          <div
            className={css.background_menu}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={css.toggle}>
              <Icon
                size={40}
                image={arrow}
                onClick={() => setIsOpenMenu(false)}
              />
              <ToggleLang />
            </div>
            <div className={css.navigate}>
              <div onClick={handleMain}>
                <FormattedMessage id="title.main" />
              </div>
              {location.pathname.includes(`/${RootPath.main}`) && (
                <>
                  <div onClick={handleProfile}>
                    <FormattedMessage id="title.profile" />
                  </div>
                  <ul className={css.list}>
                    {listMenu.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleLinkList(item.path)}
                      >
                        <FormattedMessage id={item.label} />
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div className={css.logout} onClick={handleLogout}>
              <FormattedMessage id="title.logout" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
