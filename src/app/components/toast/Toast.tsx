import cn from 'classnames';
import { FC, Fragment, useEffect, useRef, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { useIntl } from 'react-intl';

import { Icon } from '../ui-kit/icon/Icon';

import { useToastStore } from '@/app/store/toast';

import error from '@/assets/images/toast-error.svg';
import ok from '@/assets/images/toast-ok.svg';
import warning from '@/assets/images/toast-warning.svg';

import css from './Toast.module.scss';

export const Toast: FC = () => {
  const { isOpen, text, status, clearToast } = useToastStore();
  const intl = useIntl();

  const [textMessage, setTextMessage] = useState('');

  const timeRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      timeRef.current = setTimeout(() => {
        clearToast();
      }, 5 * 1000);
    }

    return () => {
      if (timeRef.current !== null) {
        clearTimeout(timeRef.current);
      }
    };
  }, [clearToast, isOpen]);

  useEffect(() => {
    if (text) {
      setTextMessage(intl.formatMessage({ id: text }));
    }
  }, [intl, text]);

  return ReactDOM.createPortal(
    <Fragment>
      {!isOpen ? null : (
        <div
          className={cn(css.toast, {
            [css.toast_ok]: status === 'ok',
            [css.toast_error]: status === 'error',
            [css.toast_warning]: status === 'warning',
          })}
        >
          <div className={css.icon}>
            {status === 'ok' && <Icon width={30} height={30} image={ok} />}
            {status === 'error' && (
              <Icon width={30} height={30} image={error} />
            )}
            {status === 'warning' && (
              <Icon width={30} height={30} image={warning} />
            )}
          </div>
          <div className={css.text}>
            {text
              ? textMessage
              : status === 'ok'
                ? 'Данные успешно сохранены'
                : 'Ошибка'}
          </div>
        </div>
      )}
    </Fragment>,
    document.getElementById('root')!,
  );
};
