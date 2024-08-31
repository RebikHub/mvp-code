import { FC, ReactNode } from 'react';

import { Button } from '../ui-kit/button/Button';

import css from './FormWrapper.module.scss';

type Props = {
  title?: string;
  btnLabel: string;
  children: ReactNode;
  isLoading?: boolean;
  onSubmit?: () => void;
};

export const FormWrapper: FC<Props> = ({
  title,
  btnLabel,
  children,
  isLoading = false,
  onSubmit,
}) => {
  return (
    <form className={css.form} onSubmit={onSubmit}>
      {title && <h2>{title}</h2>}
      <div className={css.inputs}>{children}</div>
      <Button
        className={css.submit}
        color="green"
        label={btnLabel}
        type="submit"
        isLoading={isLoading}
      />
    </form>
  );
};
