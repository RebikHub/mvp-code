import cn from 'classnames';
import { FC, ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';

import { listMenu } from './constants/constants';

import css from './Navbar.module.scss';

type Props = {
  children: ReactNode;
  className?: string;
};

export const Navbar: FC<Props> = ({ children, className }) => {
  const location = useLocation();

  return (
    <div className={className}>
      <ul className={css.menu}>
        {listMenu.map((item) => (
          <Link key={item.id} to={item.path}>
            <li
              className={cn(css.item, {
                [css.item_active]: location.pathname === item.path,
              })}
            >
              <FormattedMessage id={item.label} />
            </li>
          </Link>
        ))}
      </ul>
      <div className={css.main}>{children}</div>
    </div>
  );
};
