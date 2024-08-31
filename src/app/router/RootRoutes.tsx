import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from './components/ProtectedRoute';

import { RootPath } from './enum/enum';

const Home = lazy(() => import('../pages/home/Home'));
const AuthLayout = lazy(() => import('../pages/auth/layout/AuthLayout'));
const MainLayout = lazy(() => import('../pages/main/layout/MainLayout'));
const NotFoundPage = lazy(
  () => import('../components/not-found-page/NotFoundPage'),
);

export const RootRoutes = createBrowserRouter([
  {
    path: RootPath.root,
    element: <ProtectedRoute component={<Home />} path={`/${RootPath.main}`} />,
  },
  {
    path: `/${RootPath.auth}/*`,
    element: <AuthLayout />,
  },
  {
    path: `/${RootPath.main}/*`,
    element: (
      <ProtectedRoute
        authRequired
        component={<MainLayout />}
        path={RootPath.root}
      />
    ),
  },
  {
    path: RootPath.error,
    element: <NotFoundPage />,
  },
  {
    path: '/*',
    element: <Navigate to={RootPath.error} />,
  },
]);
