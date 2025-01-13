import { createFileRoute, Outlet } from '@tanstack/react-router';
import { CommandIcon } from 'lucide-react';

const AuthenticatedLayout = () => {
  return (
    <div className='container grid h-svh flex-col items-center justify-center bg-backgroud lg:max-w-none lg:px-0'>
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
  component: AuthenticatedLayout
});
