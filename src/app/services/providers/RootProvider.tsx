import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FC, ReactNode } from 'react';

import { Toast } from '@/app/components/toast/Toast';

import { LocalizationProvider } from './LocalizationProvider';
import { StepsProvider } from './StepsProvider';

import { useInstallApp } from '../hooks/useInstallApp';

type Props = {
  children: ReactNode;
};

export const RootProvider: FC<Props> = ({ children }) => {
  const queryClient = new QueryClient();
  useInstallApp();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <StepsProvider>
          <LocalizationProvider>
            {children}
            <Toast />
          </LocalizationProvider>
        </StepsProvider>
      </QueryClientProvider>
    </>
  );
};
