import cn from 'classnames';
import { FC, ReactNode, SyntheticEvent, useRef } from 'react';
import * as ReactDOM from 'react-dom';

import { Button } from '../ui-kit/button/Button';

import css from './Modal.module.scss';

type Props = {
  isOpen: boolean;
  title?: string;
  children?: ReactNode;
  btnLabel?: string;
  disabled?: boolean;
  onClose?: (open: boolean) => void;
  onAction?: (...arg: any[]) => void;
  iconCloseSize?: number;
  className?: string;
  isLoading?: boolean;
};

export const Modal: FC<Props> = ({
  children,
  btnLabel,
  disabled,
  onAction,
  onClose,
  isOpen = false,
  title,
  iconCloseSize = 25,
  className,
  isLoading = false,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleOK = (callback?: (...arg: any[]) => void) => {
    // onClose?.(false);

    callback?.();
  };

  const handleCancel = () => {
    onClose?.(false);
  };

  const onClickAway = (e: SyntheticEvent) => {
    e.stopPropagation();
    if (ref.current?.contains(e.target as Node)) {
      return;
    }

    onClose?.(false);
  };

  if (!isOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className={css.background} onClick={(e) => onClickAway(e)}>
      <div className={cn(css.modal, className)} ref={ref}>
        <header>
          {title && <h3>{title}</h3>}
          <svg
            className={css.close}
            onClick={handleCancel}
            width={iconCloseSize}
            height={iconCloseSize}
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.5L31 31.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M31 1.5L1.00003 31.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </header>

        {children}
        {btnLabel && (
          <Button
            color="green"
            label={btnLabel}
            disabled={disabled}
            onClick={() => handleOK(onAction)}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>,
    document.getElementById('root')!,
  );
};
