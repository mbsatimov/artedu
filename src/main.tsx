import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { toast } from 'sonner';

import { ThemeProvider } from '@/utils/context';
import { useAuthStore } from '@/utils/stores';

import { routeTree } from './routeTree.gen';

import './index.css';

const mutationCache = new MutationCache({
  onSuccess: () => {
    queryClient.invalidateQueries();
  },
  onError: (error) => {
    if (error instanceof AxiosError) {
      const errors = error.response?.data?.error;
      if (typeof errors === 'object') {
        toast.error((Object.values(errors)[0] as string[])[0] as string);
      } else if (typeof errors === 'string') {
        toast.error(errors);
      }
    }
  }
});

const queryCache = new QueryCache({
  onError: (error) => {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        useAuthStore.getState().auth.reset();
        const redirect = `${router.history.location.href}`;
        router.navigate({ to: '/login', search: { redirect } });
      }
      if (error.response?.status === 500) {
        router.navigate({ to: '/500' });
      } else if (error.response?.status === 403) {
        router.navigate({ to: '/403', replace: true });
      }
    }
  }
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 10 * 1000 // 10s
    }
  },
  mutationCache,
  queryCache
});

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
