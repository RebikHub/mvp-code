import cn from 'classnames';
import { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import { Loader } from '../loader/Loader';

import css from './Button.module.scss';

type Props = {
  label: string;
  type?: 'button' | 'submit';
  color?: 'default' | 'green' | 'gray' | 'black';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
};

export const Button: FC<Props> = ({
  label,
  type = 'button',
  color = 'default',
  className,
  onClick,
  disabled,
  isLoading = false,
}) => {
  return (
    <button
      className={cn(
        css.button,
        {
          [css.button_green]: color === 'green',
          [css.button_gray]: color === 'gray',
          [css.button_black]: color === 'black',
          [css.button_disabled]: disabled,
        },
        className,
      )}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {isLoading && !disabled ? (
        <div className={css.loader}>
          <Loader size={color === 'default' ? 16 : 20} color="secondary" />
          <FormattedMessage id="button.loading" />
        </div>
      ) : (
        label
      )}
    </button>
  );
};
