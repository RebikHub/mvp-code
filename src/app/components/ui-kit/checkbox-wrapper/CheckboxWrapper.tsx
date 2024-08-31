import cn from 'classnames';
import { FC, ReactNode } from 'react';

import css from './CheckboxWrapper.module.scss';

type Props = {
  children: ReactNode;
  className?: string;
  label?: string;
};

export const CheckboxWrapper: FC<Props> = ({ children, className, label }) => {
  return (
    <div className={cn(css.wrapper, className)}>
      {label && <label className={css.label}>{label}</label>}
      {children}
    </div>
  );
};
