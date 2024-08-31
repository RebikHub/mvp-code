/* eslint-disable react-hooks/rules-of-hooks */
import cn from 'classnames';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { FieldValues, RegisterOptions, useWatch } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { Icon } from '../icon/Icon';

import { TUseFormState } from '@/app/types/types';

import eye from '@/assets/images/password-eye.svg';
import search from '@/assets/images/search.svg';

import css from './Input.module.scss';

type Props = {
  size?: 'short' | 'long';
  placeholder: string;
  label?: string;
  error?: boolean;
  type?: 'text' | 'password' | 'email';
  autoComplete?: 'on' | 'off' | 'new-password';
  name?: string;
  formState?: TUseFormState;
  isSearch?: boolean;
  validate?: () => RegisterOptions<FieldValues, any>;
  onSearch?: () => void;
  mask?: (event: ChangeEvent<HTMLInputElement>) => string;
};

export const Input: FC<Props> = ({
  placeholder,
  size = 'long',
  label = '',
  type = 'text',
  autoComplete = 'on',
  name = placeholder,
  formState,
  isSearch = false,
  validate,
  onSearch,
  mask,
}) => {
  const [currentType, setCurrentType] = useState(type);
  const [isFocused, setIsFocused] = useState(false);
  const valueField =
    formState && useWatch({ name, control: formState.control });

  const handleToggleType = () => {
    setCurrentType((prev) => {
      if (prev === 'text') {
        return 'password';
      }
      return 'text';
    });
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const filteredValue = mask?.(event);
    filteredValue && formState?.setValue(name, filteredValue);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (type === 'password' && currentType === 'text') {
        setCurrentType('password');
      }
    }, 10 * 1000);

    return () => clearTimeout(timer);
  }, [currentType, type]);

  useEffect(() => {
    if (valueField) {
      setIsFocused(true);
    }
  }, [placeholder, valueField]);

  return (
    <div className={css.wrapper}>
      {!!label && (
        <label
          htmlFor={`inputField-${placeholder}`}
          className={cn(css.label, {
            [css.label_long]: size === 'long',
            [css.label_short]: size === 'short',
            [css.active]: isFocused,
            [css.active_long]: isFocused && size === 'long',
            [css.active_short]: isFocused && size === 'short',
            [css.active_error]:
              isFocused && Boolean(formState?.formState.errors[name]),
          })}
        >
          {isFocused ? label : ''}
        </label>
      )}
      {isSearch && (
        <Icon
          className={css.iconSearch}
          size={20}
          image={search}
          onClick={onSearch}
        />
      )}
      <input
        id={`inputField-${placeholder}`}
        className={cn(css.input, {
          [css.input_long]: size === 'long',
          [css.input_short]: size === 'short',
          [css.input_error]: Boolean(formState?.formState.errors[name]),
          [css.input_search]: isSearch,
        })}
        type={currentType}
        onInput={handleInput}
        placeholder={!label ? placeholder : isFocused ? placeholder : label}
        autoComplete={autoComplete}
        {...formState?.register(name, validate?.())}
        onFocus={() => setIsFocused(true)}
        onBlur={() => !valueField && setIsFocused(false)}
      />
      {type === 'password' && (
        <Icon
          className={cn(css.eye, {
            [css.eye_short]: size === 'short',
            [css.eye_long]: size === 'long',
          })}
          image={eye}
          onClick={handleToggleType}
        />
      )}
      {formState?.formState.errors[name]?.message && (
        <p className={css.error}>
          <FormattedMessage
            id={formState?.formState.errors[name]?.message as string}
          />
        </p>
      )}
    </div>
  );
};
