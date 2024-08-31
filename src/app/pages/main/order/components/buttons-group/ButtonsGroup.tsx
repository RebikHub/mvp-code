import cn from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/app/components/ui-kit/button/Button';

import { RootPath } from '@/app/router/enum/enum';

import { useText } from '@/app/services/hooks/useLocalization';

import css from './ButtonsGroup.module.scss';

type Props = {
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onNextStep?: () => void;
  onCancel?: () => void;
};

export const ButtonsGroup: FC<Props> = ({
  className,
  type = 'submit',
  disabled = false,
  onNextStep,
  onCancel,
}) => {
  return (
    <div className={cn(css.buttons, className)}>
      <Button
        label={useText('button.next')}
        color="green"
        type={type}
        disabled={disabled}
        onClick={onNextStep}
      />

      <Link to={`/${RootPath.main}`}>
        <Button
          label={useText('button.cancel')}
          color="gray"
          onClick={onCancel}
        />
      </Link>
    </div>
  );
};
