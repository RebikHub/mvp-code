import { FC, ReactNode } from 'react';
import { IntlProvider } from 'react-intl';

import { useLocaleStore } from '@/app/store/localization';

import { languages } from '@/locales/index';

type Props = {
  children: ReactNode;
};

export const LocalizationProvider: FC<Props> = ({ children }) => {
  const locale = useLocaleStore.use.locale();

  return (
    <IntlProvider locale={locale} messages={languages[locale]}>
      {children}
    </IntlProvider>
  );
};
