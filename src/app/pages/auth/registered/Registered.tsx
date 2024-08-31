import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { FormWrapper } from '@/app/components/form-wrapper/FormWrapper';

import { AuthPath, RootPath } from '@/app/router/enum/enum';

import { useText } from '@/app/services/hooks/useLocalization';

import css from './Registered.module.scss';

export const Registered = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/${RootPath.auth}/${AuthPath.login}`);
  };

  return (
    <FormWrapper btnLabel={useText('button.login')} onSubmit={handleSubmit}>
      <p className={css.title}>
        <FormattedMessage id="page.registered" />
      </p>
    </FormWrapper>
  );
};
