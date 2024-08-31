import cn from 'classnames';
import { FC, useEffect, useState } from 'react';

import { Icon } from '../icon/Icon';

import { useScreenWidth } from '@/app/services/hooks/useScreenWidth';

import checkMark from '@/assets/images/check.svg';

import css from './Checkbox.module.scss';

type Props = {
  label?: string;
  check?: boolean;
  onClick?: (checked: boolean) => void;
  side?: 'left' | 'right';
  size?: 'small' | 'large';
  square?: boolean;
  disabled?: boolean;
};

export const Checkbox: FC<Props> = ({
  label,
  check = false,
  onClick,
  side = 'right',
  size = 'small',
  square = false,
  disabled,
}) => {
  const [checked, setChecked] = useState(check);
  const { isPhones } = useScreenWidth();

  const handleCheck = () => {
    if (disabled) {
      return;
    }
    onClick?.(!checked);
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    setChecked(check);
  }, [check]);

  return (
    <div
      className={cn(css.container, { [css.container_disable]: disabled })}
      onClick={handleCheck}
    >
      {side === 'left' && label && <label>{label}</label>}
      <div
        className={cn(css.checkbox, {
          [css.checkbox_checked]: checked,
          [css.checkbox_large]: size === 'large',
          [css.checkbox_square]: square,
        })}
      >
        {checked && (
          <Icon
            isRem={!isPhones}
            size={size === 'small' ? 10 : 20}
            image={checkMark}
          />
        )}
      </div>
      {side === 'right' && label && <label>{label}</label>}
    </div>
  );
};
