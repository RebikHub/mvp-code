import cn from 'classnames';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { Icon } from '../ui-kit/icon/Icon';

import big from '@/assets/images/logo-big.svg';
import small from '@/assets/images/logo-small.svg';

import css from './Logo.module.scss';

type Props = {
  width?: number;
  height?: number;
  image?: string;
  label?: string;
  className?: string;
};

export const Logo: FC<Props> = ({ className }) => {
  const location = useLocation();
  const isBig = location.pathname === '/';
  return (
    <div className={cn(css.logo, className)}>
      <Icon size={isBig ? 60 : 40} image={isBig ? big : small} />
      {!isBig && <p>Mvp</p>}
    </div>
  );
};
