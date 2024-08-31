import { FC } from 'react';
import { FieldValues } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';

import { FormWrapper } from '@/app/components/form-wrapper/FormWrapper';
import { Logo } from '@/app/components/logo/Logo';
import { ToggleLang } from '@/app/components/toggle-lang/ToggleLang';
import { Button } from '@/app/components/ui-kit/button/Button';
import { Icon } from '@/app/components/ui-kit/icon/Icon';
import { Input } from '@/app/components/ui-kit/input/Input';

import cognito from '@/app/api/cognito/cognito';
import { useBaseMutation } from '@/app/api/hooks/useBaseMutation';

import { AuthPath, RootPath } from '@/app/router/enum/enum';

import { useFormManagement } from '@/app/services/hooks/useFormManagement';
import { text } from '@/app/services/hooks/useLocalization';
import storage from '@/app/services/utils/storage';
import { validateDefaultRequired } from '@/app/services/validators/validators';

import finger from '@/assets/images/finger-login.svg';

import css from './Login.module.scss';

type Props = {
  isPhones?: boolean;
};

export const Login: FC<Props> = ({ isPhones }) => {
  const navigate = useNavigate();
  const intl = useIntl();
  const { formState, onSubmit } = useFormManagement();
  const { mutate, isPending } = useBaseMutation(cognito.login, {
    invalidateQueryKey: `get/users/${storage.userId()}`,
    success: {
      text: 'toast.login',
    },
  });

  const handleSubmit = async (data: FieldValues) => {
    if (data) {
      mutate(
        {
          username: data.email,
          password: data.password,
        },
        {
          onSuccess: () => {
            navigate(`/${RootPath.main}`);
          },
        },
      );
    }
  };

  if (isPhones) {
    return (
      <div className={css.wrapperContainer}>
        <FormWrapper
          title={text(intl, 'title.login')}
          btnLabel={text(intl, 'button.login')}
          isLoading={isPending}
          onSubmit={onSubmit(handleSubmit)}
        >
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
            validate={validateDefaultRequired}
          />
          <Link to={`/${RootPath.auth}/${AuthPath.resetPassword}`}>
            <p className={css.linkText}>
              <FormattedMessage id="page.login.reset" />
            </p>
          </Link>
        </FormWrapper>

        <div className={css.actions}>
          <Link to={`/${RootPath.auth}/${AuthPath.signUp}`}>
            <FormattedMessage tagName="p" id="page.login.register" />
          </Link>

          <Link to={`/${RootPath.auth}/${AuthPath.signUp}`}>
            <Button
              className={css.actions_btn}
              label={text(intl, 'button.signup')}
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
              <Link to={`/${RootPath.auth}/${AuthPath.signUp}`}>
                <FormattedMessage tagName="p" id="page.login.register" />
              </Link>

              <Link to={`/${RootPath.auth}/${AuthPath.signUp}`}>
                <Button
                  className={css.actions_btn}
                  color="green"
                  label={text(intl, 'button.signup')}
                />
              </Link>
            </div>
          </div>
        </main>
      </section>
      <section className={css.right}>
        <header>
          <ToggleLang />
        </header>

        <main>
          <FormWrapper
            title={text(intl, 'title.login')}
            btnLabel={text(intl, 'button.login')}
            isLoading={isPending}
            onSubmit={onSubmit(handleSubmit)}
          >
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
              validate={validateDefaultRequired}
            />
            <Link to={`/${RootPath.auth}/${AuthPath.resetPassword}`}>
              <p className={css.linkText}>
                <FormattedMessage id="page.login.reset" />
              </p>
            </Link>
          </FormWrapper>
        </main>
      </section>
    </>
  );
};
