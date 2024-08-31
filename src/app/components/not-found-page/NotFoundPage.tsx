import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import { Logo } from '../logo/Logo';
import { ToggleLang } from '../toggle-lang/ToggleLang';
import { Button } from '../ui-kit/button/Button';
import { Icon } from '../ui-kit/icon/Icon';

import { MobileLayout } from '@/app/pages/layout/MobileLayout';

import { text } from '@/app/services/hooks/useLocalization';
import { useScreenWidth } from '@/app/services/hooks/useScreenWidth';

import finger from '@/assets/images/finger-404.svg';

import css from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  const { isPhones } = useScreenWidth();
  const intl = useIntl();

  if (isPhones) {
    return (
      <MobileLayout>
        <div className={css.code}>
          <p>4</p>
          <Icon
            width={isPhones ? 115 : 210}
            height={isPhones ? 115 : 210}
            image={finger}
          />
          <p>4</p>
        </div>
        <p className={css.description}>
          <FormattedMessage id="page.notfound" />
        </p>
        <Link to={'/'}>
          <Button color="green" label={text(intl, 'button.back')} />
        </Link>
      </MobileLayout>
    );
  }

  return (
    <div className={css.container}>
      <Link to="/">
        <div className={css.logo}>
          <Logo />
        </div>
      </Link>
      <div className={css.toggle}>
        <ToggleLang />
      </div>

      <div className={css.code}>
        <p>4</p>
        <Icon width={210} height={210} image={finger} />
        <p>4</p>
      </div>
      <p className={css.description}>
        <FormattedMessage id="page.notfound" />
      </p>
      <Link to={'/'}>
        <Button color="green" label={text(intl, 'button.back')} />
      </Link>
    </div>
  );
};

export default NotFoundPage;
