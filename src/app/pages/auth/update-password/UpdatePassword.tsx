import { FieldValues } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { FormWrapper } from '@/app/components/form-wrapper/FormWrapper';
import { InfoStep } from '@/app/components/ui-kit/info-step/InfoStep';
import { Input } from '@/app/components/ui-kit/input/Input';

import cognito from '@/app/api/cognito/cognito';
import { useBaseMutation } from '@/app/api/hooks/useBaseMutation';

import { AuthPath, RootPath } from '@/app/router/enum/enum';

import { useFormManagement } from '@/app/services/hooks/useFormManagement';
import { useText } from '@/app/services/hooks/useLocalization';
import {
  validateDefaultRequired,
  validatePassword,
} from '@/app/services/validators/validators';

import css from './UpdatePassword.module.scss';

export const UpdatePassword = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { formState, onSubmit } = useFormManagement();
  const { mutate, isPending } = useBaseMutation(cognito.confirmPassword);

  const handleSubmit = (data: FieldValues) => {
    if (data) {
      mutate(
        {
          email: state.email,
          code: String(data.code),
          password: data.password,
        },
        {
          onSuccess: () => {
            navigate(`/${RootPath.auth}/${AuthPath.login}`);
          },
        },
      );
    }
  };

  return (
    <div className={css.container}>
      <FormWrapper
        title={useText('title.reset')}
        btnLabel={useText('button.done')}
        onSubmit={onSubmit(handleSubmit)}
        isLoading={isPending}
      >
        <Input
          placeholder={useText('input.placeholder.code')}
          size="short"
          label={useText('input.label.code')}
          name="code"
          autoComplete="new-password"
          formState={formState}
          validate={validateDefaultRequired}
        />
        <Input
          placeholder={useText('input.placeholder.newPassword')}
          size="short"
          label={useText('input.label.newPassword')}
          type="password"
          name="password"
          autoComplete="new-password"
          formState={formState}
          validate={validatePassword}
        />
      </FormWrapper>
      <InfoStep className={css.info} content={useText('info.password')} />
    </div>
  );
};
