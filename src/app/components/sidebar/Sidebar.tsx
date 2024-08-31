import { FormattedMessage } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';

import { Logo } from '../logo/Logo';
import { ToggleLang } from '../toggle-lang/ToggleLang';

import { RootPath } from '@/app/router/enum/enum';

import css from './Sidebar.module.scss';

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className={css.sidebar}>
      <Link to="/">
        <Logo />
      </Link>

      {!location.pathname.includes('/auth') && (
        <div className={css.main}>
          <Link to={`/${RootPath.main}`}>
            <FormattedMessage tagName="p" id="title.main" />
          </Link>
        </div>
      )}

      <ToggleLang className={css.toggle} />
    </div>
  );
};
