import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { CommandIcon } from 'lucide-react';

import { useAuthStore } from '@/utils/stores';

const AuthenticatedLayout = () => {
  return (
    <div className='bg-backgroud container grid h-svh flex-col items-center justify-center lg:max-w-none lg:px-0'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
        <div className='mb-4 flex items-center justify-center'>
          <CommandIcon />
          <h1 className='text-xl font-medium'>ARTEDU</h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ location }) => {
    if (useAuthStore.getState().auth.accessToken) {
      throw redirect({
        to: '/courses',
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
