import { FC } from 'react';
import { FieldValues } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';

import { FormWrapper } from '@/app/components/form-wrapper/FormWrapper';
import { Logo } from '@/app/components/logo/Logo';
import { ToggleLang } from '@/app/components/toggle-lang/ToggleLang';
import { Button } from '@/app/components/ui-kit/button/Button';
import { Icon } from '@/app/components/ui-kit/icon/Icon';
import { InfoStep } from '@/app/components/ui-kit/info-step/InfoStep';
import { Input } from '@/app/components/ui-kit/input/Input';

import cognito from '@/app/api/cognito/cognito';
import { useBaseMutation } from '@/app/api/hooks/useBaseMutation';

import { AuthPath, RootPath } from '@/app/router/enum/enum';

import { useFormManagement } from '@/app/services/hooks/useFormManagement';
import { text } from '@/app/services/hooks/useLocalization';
import {
  validateComparisonPass,
  validateDefaultRequired,
  validatePassword,
} from '@/app/services/validators/validators';

import finger from '@/assets/images/finger-signup.svg';

import css from './SignUp.module.scss';

type Props = {
  isPhones?: boolean;
};

export const SignUp: FC<Props> = ({ isPhones }) => {
  const navigate = useNavigate();
  const intl = useIntl();
  const { formState, onSubmit, getValues } = useFormManagement();
  const { mutate, isPending } = useBaseMutation(cognito.signIn, {
    success: {
      text: 'toast.signup',
    },
  });

  const handleSubmit = (data: FieldValues) => {
    if (data) {
      mutate(
        {
          username: data.username,
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: () => {
            navigate(`/${RootPath.auth}/${AuthPath.registered}`);
          },
        },
      );
    }
  };

  if (isPhones) {
    return (
      <div className={css.wrapperContainer}>
        <FormWrapper
          title={text(intl, 'title.signup')}
          btnLabel={text(intl, 'button.next')}
          onSubmit={onSubmit(handleSubmit)}
          isLoading={isPending}
        >
          <Input
            placeholder={text(intl, 'input.username')}
            size="short"
            label={text(intl, 'input.username')}
            name="username"
            formState={formState}
            validate={validateDefaultRequired}
          />
          <Input
            placeholder={text(intl, 'input.email')}
            size="short"
            label={text(intl, 'input.email')}
            name="email"
            formState={formState}
            validate={validateDefaultRequired}
          />
          <Input
            placeholder={text(intl, 'input.password')}
            type="password"
            size="short"
            name="password"
            formState={formState}
            validate={validatePassword}
          />
          <Input
            placeholder={text(intl, 'input.password.confirm')}
            type="password"
            size="short"
            name="passwordConfirm"
            formState={formState}
            validate={() => validateComparisonPass(getValues('password'))}
          />
        </FormWrapper>

        <InfoStep className={css.info} content={text(intl, 'info.password')} />

        <div className={css.actions}>
          <Link to={`/${RootPath.auth}/${AuthPath.login}`}>
            <FormattedMessage tagName="p" id="page.signup.login" />
          </Link>

          <Link to={`/${RootPath.auth}/${AuthPath.login}`}>
            <Button
              className={css.actions_btn}
              label={text(intl, 'title.login')}
            />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className={css.left}>
        <header>
          <ToggleLang />
        </header>

        <main className={css.containerForm}>
          <FormWrapper
            title={text(intl, 'title.signup')}
            btnLabel={text(intl, 'button.next')}
            onSubmit={onSubmit(handleSubmit)}
            isLoading={isPending}
          >
            <Input
              placeholder={text(intl, 'input.username')}
              size="short"
              label={text(intl, 'input.username')}
              name="username"
              formState={formState}
              validate={validateDefaultRequired}
            />
            <Input
              placeholder={text(intl, 'input.email')}
              size="short"
              label={text(intl, 'input.email')}
              name="email"
              formState={formState}
              validate={validateDefaultRequired}
            />
            <Input
              placeholder={text(intl, 'input.password')}
              type="password"
              size="short"
              name="password"
              formState={formState}
              validate={validatePassword}
            />
            <Input
              placeholder={text(intl, 'input.password.confirm')}
              type="password"
              size="short"
              name="passwordConfirm"
              formState={formState}
              validate={() => validateComparisonPass(getValues('password'))}
            />
          </FormWrapper>

          <InfoStep
            className={css.info}
            content={text(intl, 'info.password')}
          />
        </main>
      </section>
      <section className={css.right}>
        <header>
          <Link to="/">
            <Logo />
          </Link>
        </header>

        <main>
          <div>
            <div className={css.image}>
              <Icon width={400} height={400} image={finger} />
            </div>
            <div className={css.actions}>
              <Link to={`/${RootPath.auth}/${AuthPath.login}`}>
                <FormattedMessage tagName="p" id="page.signup.login" />
              </Link>

              <Link to={`/${RootPath.auth}/${AuthPath.login}`}>
                <Button
                  className={css.actions_btn}
                  color="green"
                  label={text(intl, 'title.login')}
                />
              </Link>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
