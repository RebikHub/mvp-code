import { Profile } from '../../components/profile/Profile';
import { Info } from '../components/info/Info';
import { Navbar } from '../components/navbar/Navbar';

import { ProfileRoutes } from '@/app/router/main/profile/ProfileRoutes';

import { useScreenWidth } from '@/app/services/hooks/useScreenWidth';

import css from './ProfileLayout.module.scss';

export const ProfileLayout = () => {
  const { isPhones } = useScreenWidth();

  if (isPhones) {
    return (
      <div className={css.main}>
        <Profile />
        <div className={css.container}>
          <ProfileRoutes isPhones={isPhones} />
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
        <Navbar>
          <ProfileRoutes />
        </Navbar>
      </div>
    </div>
  );
};
