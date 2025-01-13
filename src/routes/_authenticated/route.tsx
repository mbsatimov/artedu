import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { NuqsAdapter } from 'nuqs/adapters/react';

import { AppHeader } from '@/components/Layout';
import { TooltipProvider } from '@/components/ui';
import { useAuthStore } from '@/utils/stores';

const AuthenticatedLayout = () => {
  return (
    <NuqsAdapter>
      <TooltipProvider>
        <AppHeader />
        <Outlet />
      </TooltipProvider>
    </NuqsAdapter>
  );
};

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    if (!useAuthStore.getState().auth.user) {
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
