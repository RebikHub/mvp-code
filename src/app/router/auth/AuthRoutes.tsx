import { FC } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import { Login } from '@/app/pages/auth/login/Login';
import { Registered } from '@/app/pages/auth/registered/Registered';
import { ResetPassword } from '@/app/pages/auth/reset-password/ResetPassword';
import { SignUp } from '@/app/pages/auth/signup/SignUp';
import { UpdatePassword } from '@/app/pages/auth/update-password/UpdatePassword';

import { AuthPath, RootPath } from '../enum/enum';

type Props = {
  isPhones?: boolean;
};

export const AuthRoutes: FC<Props> = ({ isPhones = false }) =>
  useRoutes([
    {
      path: AuthPath.login,
      element: <Login isPhones={isPhones} />,
    },
    {
      path: AuthPath.signUp,
      element: <SignUp isPhones={isPhones} />,
    },
    {
      path: AuthPath.resetPassword,
      element: <ResetPassword />,
    },
    {
      path: AuthPath.updatePassword,
      element: <UpdatePassword />,
    },
    {
      path: AuthPath.registered,
      element: <Registered />,
    },
    {
      path: '/*',
      element: <Navigate to={`/${RootPath.error}`} />,
    },
  ]);
