import { Link } from '@tanstack/react-router';
import { CommandIcon } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils.ts';

import { AppHeaderNavUser } from './AppHeaderNavUser';
import { AppHeaderThemeSwitch } from './AppHeaderThemeSwitch';

interface AppHeaderProps extends React.ComponentProps<'header'> {}

export const AppHeader = React.forwardRef<React.ElementRef<'header'>, AppHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn('sticky left-0 top-0 z-50 h-16 gap-3 border-b bg-background', className)}
        {...props}
      >
        <div className='mx-auto flex h-full max-w-7xl items-center gap-3 px-4'>
          <Link to='/courses'>
            <div className='flex items-center justify-center gap-1'>
              <CommandIcon />
              <h1 className='text-xl font-medium'>ARTEDU</h1>
            </div>
          </Link>
          <div className='ml-auto flex items-center space-x-4'>
            <AppHeaderThemeSwitch />
            <AppHeaderNavUser />
          </div>
        </div>
      </header>
    );
  }
);
AppHeader.displayName = 'AppHeader';
