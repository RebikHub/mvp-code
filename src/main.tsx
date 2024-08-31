import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { Line } from './app/components/ui-kit/loader/Line.tsx';
import { RootRoutes } from './app/router/RootRoutes.tsx';
import { RootProvider } from './app/services/providers/RootProvider.tsx';
import { registerServiceWorker } from './service-worker/registerSW.ts';

import '../src/app/styles/main.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<Line />}>
      <RootProvider>
        <RouterProvider router={RootRoutes} fallbackElement={<Line />} />
      </RootProvider>
    </Suspense>
  </React.StrictMode>,
);

registerServiceWorker();
