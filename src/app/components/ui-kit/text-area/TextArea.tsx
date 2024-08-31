/* eslint-disable react-hooks/rules-of-hooks */
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { FieldValues, RegisterOptions, useWatch } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { TUseFormState } from '@/app/types/types';

import css from './TextArea.module.scss';

type Props = {
  className?: string;
  placeholder: string;
  label?: string;
  error?: boolean;
  name?: string;
  formState?: TUseFormState;
  validate?: () => RegisterOptions<FieldValues, any>;
};

export const TextArea: FC<Props> = ({
  className,
  placeholder,
  label = '',
  error = false,
  name = placeholder,
  formState,
  validate,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const valueField =
    formState && useWatch({ name, control: formState.control });

  useEffect(() => {
    if (valueField) {
      setIsFocused(true);
    }
  }, [placeholder, valueField]);

  return (
    <div className={css.wrapper}>
      {!!label && (
        <label
          htmlFor="textAreaField"
          className={cn(css.label, {
            [css.active]: isFocused,
            [css.active_error]:
              isFocused && (error || formState?.formState.errors[name]),
          })}
        >
          {isFocused ? label : ''}
        </label>
      )}
      <textarea
        id="textAreaField"
        className={cn(
          css.textarea,
          {
            [css.textarea_error]: error || formState?.formState.errors[name],
          },
          className,
        )}
        placeholder={!label ? placeholder : isFocused ? placeholder : label}
        {...formState?.register(name, validate?.())}
        onFocus={() => setIsFocused(true)}
        onBlur={() => !valueField && setIsFocused(false)}
      />

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
