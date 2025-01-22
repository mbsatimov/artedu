import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { NuqsAdapter } from 'nuqs/adapters/react';

import { AppHeader } from '@/components/Layout';
import { Spinner } from '@/components/ui';
import { getMe } from '@/utils/api/requests';
import { useAuth, useAuthStore } from '@/utils/stores';

const AuthenticatedLayout = () => {
  const { setUser } = useAuth();
  const getMeQuery = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const { data } = await getMe();
      if (data.ok) setUser(data.result);
      return data;
    }
  });

  if (getMeQuery.isLoading) {
    return (
      <div className='grid h-svh place-items-center'>
        <Spinner className='size-10' />
      </div>
    );
  }

  return (
    <NuqsAdapter>
      <AppHeader />
      <Outlet />
    </NuqsAdapter>
  );
};

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    if (!useAuthStore.getState().auth.accessToken) {
      throw redirect({
        to: '/login',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href
        }
      });
    }
  },
  component: AuthenticatedLayout
});
