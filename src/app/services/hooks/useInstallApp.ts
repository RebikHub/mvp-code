import { useCallback, useEffect } from 'react';

import { usePromptStore } from '@/app/store/prompt';

import { BeforeInstallPromptEvent } from '@/app/types/types';

import storage from '../utils/storage';

export const useInstallApp = () => {
  const setPrompt = usePromptStore.use.setPrompt();

  const beforeinstallprompt = useCallback(
    (ev: BeforeInstallPromptEvent) => {
      ev.preventDefault();
      setPrompt(ev);
    },
    [setPrompt],
  );

  useEffect(() => {
    storage.unselectedInstallPWA();
    window.addEventListener('beforeinstallprompt', beforeinstallprompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', beforeinstallprompt);
    };
  }, [beforeinstallprompt]);
};
