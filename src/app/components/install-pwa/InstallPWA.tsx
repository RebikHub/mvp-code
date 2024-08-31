import { FC, useState } from 'react';
import { useIntl } from 'react-intl';

import { Button } from '../ui-kit/button/Button';

import { usePromptStore } from '@/app/store/prompt';

import { text } from '@/app/services/hooks/useLocalization';
import storage from '@/app/services/utils/storage';

interface NavigatorUAData {
  brands: Array<{ brand: string; version: string }>;
  mobile: boolean;
  platform: string;
}

interface Navigator extends globalThis.Navigator {
  userAgentData: NavigatorUAData;
}

type Props = {
  className?: string;
};

export const InstallPWA: FC<Props> = ({ className }) => {
  const selected = storage.statusSelectedInstallPWA();
  const [isOpenButton, setIsOpenButton] = useState(selected === 'unselected');
  const event = usePromptStore.use.event();

  const intl = useIntl();

  const handleInstall = () => {
    if (event) {
      event.prompt();
      event.userChoice.then(() => {
        setIsOpenButton(false);
        storage.selectedInstallPWA();
      });
    }
  };

  const isOpera =
    'userAgentData' in window.navigator
      ? (navigator as Navigator).userAgentData.brands.find(
          ({ brand }) => brand === 'Opera',
        )
      : false;

  if (isOpenButton && event && !isOpera) {
    return (
      <Button
        className={className}
        label={text(intl, 'button.install')}
        onClick={handleInstall}
      />
    );
  }
  return null;
};
