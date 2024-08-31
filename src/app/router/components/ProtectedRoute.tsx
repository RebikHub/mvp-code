import { useQuery } from '@tanstack/react-query';
import { FC, ReactNode, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

import { Line } from '@/app/components/ui-kit/loader/Line';

import cognito from '@/app/api/cognito/cognito';

type Props = {
  component: ReactNode;
  path: string;
  authRequired?: boolean;
};

export const ProtectedRoute: FC<Props> = ({
  component,
  path,
  authRequired = false,
}) => {
  const { data, isPending } = useQuery({
    queryKey: ['status-auth'],
    queryFn: cognito.checkAuthTokens,
  });

  if (isPending) {
    return <Line />;
  }

  return (
    <Suspense fallback={<Line />}>
      {(authRequired ? data?.auth : !data?.auth) ? (
        component
      ) : (
        <Navigate to={path} />
      )}
    </Suspense>
  );
};
