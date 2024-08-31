import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { InstallPWA } from '@/app/components/install-pwa/InstallPWA';
import { Logo } from '@/app/components/logo/Logo';
import { ToggleLang } from '@/app/components/toggle-lang/ToggleLang';
import { Finger } from '@/app/components/ui-kit/finger/Finger';
import { Icon } from '@/app/components/ui-kit/icon/Icon';

import { MobileLayout } from '../layout/MobileLayout';

import { AuthPath, RootPath } from '@/app/router/enum/enum';

import { useScreenWidth } from '@/app/services/hooks/useScreenWidth';

import leftDown from '@/assets/images/left-down-corner.svg';
import leftUp from '@/assets/images/left-up-corner.svg';
import rightDown from '@/assets/images/right-down-corner.svg';
import rightUp from '@/assets/images/right-up-corner.svg';

import css from './Home.module.scss';

const Home = () => {
  const { isPhones, screenWidth } = useScreenWidth();

  if (isPhones) {
    return (
      <MobileLayout>
        <div className={css.info}>
          <FormattedMessage id="info.home.head" />
        </div>
        <div className={css.wrapperContainer}>
          <p className={css.title}>Mvp</p>
          <div className={css.logo}>
            <div className={css.logo_center}>
              <div className={css.finger}>
                <Finger size={screenWidth / 2} opacity={0.1} />
                <div className={css.finger_scan}>
                  <Finger size={screenWidth / 2} />
                </div>
              </div>
            </div>
            <div className={css.logo_line} />
          </div>
          <Link className={css.link} to={`${RootPath.auth}/${AuthPath.login}`}>
            <FormattedMessage id="page.home" />
          </Link>
        </div>
        <div className={css.info}>
          <FormattedMessage tagName="p" id="info.home.footer" />
        </div>
      </MobileLayout>
    );
  }

  return (
    <div className={css.home}>
      <header>
        <Logo />
        <div className={css.actions}>
          <InstallPWA />
          <ToggleLang />
          <Link className={css.link} to={`${RootPath.auth}/${AuthPath.login}`}>
            <FormattedMessage id="page.home" />
          </Link>
        </div>
      </header>
      <div className={css.info}>
        <FormattedMessage id="info.home.head" />
      </div>
      <main>
        <div className={css.logo}>
          <div className={css.logo_left}>
            <Icon width={100} height={100} image={leftUp} />
            <Icon width={100} height={100} image={leftDown} />
          </div>
          <div className={css.logo_center}>
            <div className={css.finger}>
              <Finger size={screenWidth / 4.5} opacity={0.1} />
              <div className={css.finger_scan}>
                <Finger size={screenWidth / 4.5} />
              </div>
            </div>
          </div>
          <div className={css.logo_right}>
            <Icon width={100} height={100} image={rightUp} />
            <Icon width={100} height={100} image={rightDown} />
          </div>
          <div className={css.logo_line} />
        </div>
        <p>Mvp</p>
      </main>
      <div className={css.info}>
        <FormattedMessage tagName="p" id="info.home.footer" />
      </div>
    </div>
  );
};

export default Home;
