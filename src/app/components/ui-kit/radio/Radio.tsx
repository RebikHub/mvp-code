import cn from 'classnames';
import { FC, useEffect, useState } from 'react';

import css from './Radio.module.scss';

type Props = {
  label?: string;
  check?: boolean;
  onClick?: (checked: boolean) => void;
  side?: 'left' | 'right' | 'top';
  size?: 'small' | 'large';
  disabled?: boolean;
};

export const Radio: FC<Props> = ({
  label,
  check = false,
  onClick,
  side = 'right',
  size = 'small',
  disabled,
}) => {
  const [checked, setChecked] = useState(check);

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
      className={cn(css.container, {
        [css.container_disable]: disabled,
        [css.container_top]: side === 'top',
      })}
      onClick={handleCheck}
    >
      {side === 'left' && label && <label>{label}</label>}
      {side === 'top' && label && <label>{label}</label>}
      <div
        className={cn(css.radio, {
          [css.radio_large]: size === 'large',
        })}
      >
        {checked && <div className={css.radio_checked} />}
      </div>
      {side === 'right' && label && <label>{label}</label>}
    </div>
  );
};
