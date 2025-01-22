import React from 'react';

import { cn } from '@/lib/utils';

interface MainProps extends React.HTMLAttributes<React.ElementRef<'main'>> {
  fixed?: boolean;
}

export const Main = React.forwardRef<React.ElementRef<'main'>, MainProps>(
  ({ fixed, className, ...props }, ref) => {
    return (
      <main
        ref={ref}
        className={cn(
          'mx-auto max-w-7xl px-4 py-6',
          fixed && 'flex flex-grow flex-col overflow-hidden',
          className
        )}
        {...props}
      />
    );
  }
);
Main.displayName = 'Main';
