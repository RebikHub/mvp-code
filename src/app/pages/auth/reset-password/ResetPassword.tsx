import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { FormWrapper } from '@/app/components/form-wrapper/FormWrapper';
import { Input } from '@/app/components/ui-kit/input/Input';

import cognito from '@/app/api/cognito/cognito';
import { useBaseMutation } from '@/app/api/hooks/useBaseMutation';

import { AuthPath, RootPath } from '@/app/router/enum/enum';

import { useFormManagement } from '@/app/services/hooks/useFormManagement';
import { useText } from '@/app/services/hooks/useLocalization';
import { validateEmail } from '@/app/services/validators/validators';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { formState, onSubmit } = useFormManagement();
  const { mutate, isPending } = useBaseMutation(cognito.forgotPassword, {
    success: {
      text: 'toast.reset.password',
    },
  });

  const handleSubmit = (data: FieldValues) => {
    if (data) {
      mutate(data.email, {
        onSuccess: () => {
          navigate(`/${RootPath.auth}/${AuthPath.updatePassword}`, {
            state: {
              email: data.email,
            },
          });
        },
      });
    }
  };

  return (
    <FormWrapper
      title={useText('title.reset')}
      btnLabel={useText('button.reset')}
      onSubmit={onSubmit(handleSubmit)}
      isLoading={isPending}
    >
      <Input
        placeholder={useText('input.email')}
        size="short"
        label={useText('input.email')}
        name="email"
        formState={formState}
        validate={validateEmail}
      />
    </FormWrapper>
  );
};
