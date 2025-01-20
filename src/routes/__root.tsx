import { createRootRoute, Outlet } from '@tanstack/react-router';

import { Toaster } from '@/components/ui';
import { NotFoundError } from '@/routes/(errors)/404.lazy';
import { GeneralError } from '@/routes/(errors)/500.lazy';

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
    </>
  ),
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
