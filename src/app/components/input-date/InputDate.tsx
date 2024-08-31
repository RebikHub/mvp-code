import cn from 'classnames';
import {
  FC,
  ForwardedRef,
  ReactElement,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Icon } from '@/app/components/ui-kit/icon/Icon';

import { useHideComponent } from '@/app/services/hooks/useHideComponent';

import { TUseFormState } from '@/app/types/types';

import css from './InputDate.module.scss';

type Props = {
  size?: 'short' | 'long';
  placeholder: string;
  label?: boolean;
  error?: boolean;
  autoComplete?: string;
  outsideValue?: string;
  name?: string;
  formState?: TUseFormState;
  iconSrc?: string;
  render: ({
    onSelectDate,
    inputDate,
    classNames,
    ref,
  }: {
    onSelectDate: (date: string) => void;
    inputDate?: string;
    classNames?: string;
    ref: ForwardedRef<unknown>;
  }) => ReactElement;
};

export const InputDate: FC<Props> = ({
  placeholder,
  size = 'long',
  label = false,
  error = false,
  autoComplete = 'on',
  outsideValue = '',
  name,
  formState,
  iconSrc,
  render,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpenCalendar] = useState(false);
  const [inputValue, setInputValue] = useState(outsideValue);

  const refDiv = useHideComponent<HTMLDivElement, HTMLInputElement>(
    setIsOpenCalendar,
    ref as RefObject<HTMLInputElement>,
  );

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (ref.current && ref.current.value) {
      return;
    }

    if (isOpen) {
      return;
    }

    setIsFocused(false);
  };

  const handleSelectDate = (date: string) => {
    setInputValue(date);
  };

  const handleInputClick = () => {
    setIsOpenCalendar((prev) => !prev);
  };

  useEffect(() => {
    if (name && formState && inputValue) {
      formState.setValue(name, inputValue);
      setIsFocused(true);
    }
  }, [formState, inputValue, name]);

  useEffect(() => {
    if (outsideValue) {
      setInputValue(outsideValue);
    }
  }, [outsideValue]);

  return (
    <div className={css.wrapper}>
      {label && (
        <label
          htmlFor="inputField"
          className={cn(css.label, {
            [css.label_long]: size === 'long',
            [css.label_short]: size === 'short',
            [css.active]: isFocused,
            [css.active_long]: isFocused && size === 'long',
            [css.active_short]: isFocused && size === 'short',
            [css.active_error]: isFocused && error,
          })}
        >
          {placeholder}
        </label>
      )}
      <input
        id="inputField"
        key={inputValue}
        className={cn(css.input, {
          [css.input_long]: size === 'long',
          [css.input_short]: size === 'short',
          [css.input_error]: error,
        })}
        type="text"
        placeholder={!label ? placeholder : ''}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={ref}
        autoComplete={autoComplete}
        defaultValue={inputValue}
        onClick={handleInputClick}
        readOnly
      />
      {iconSrc && (
        <Icon
          className={cn(css.icon, { [css.icon_short]: size === 'short' })}
          size={20}
          image={iconSrc}
        />
      )}
      {isOpen &&
        render({
          classNames: css.calendar,
          onSelectDate: handleSelectDate,
          inputDate: inputValue,
          ref: refDiv,
        })}
      {error && <p className={css.error}>Input error</p>}
    </div>
  );
};
