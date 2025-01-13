import { Link } from '@tanstack/react-router';
import { BadgeCheckIcon, HistoryIcon, LogOutIcon } from 'lucide-react';
import { formatPhoneNumber } from 'react-phone-number-input';

import { Button, Skeleton } from '@/components/ui';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/utils/stores';

export const AppHeaderNavUser = () => {
  const { user } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='relative h-8 w-8 rounded-full' variant='ghost'>
          <Avatar className='h-8 w-8'>
            <AvatarImage alt='@shadcn' src='/avatars/01.png' />
            <AvatarFallback>SN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            {user ? (
              <>
                <p className='text-sm font-medium leading-none'>{`${user.first_name} ${user.last_name}`}</p>
                <p className='text-xs leading-none text-muted-foreground'>
                  {formatPhoneNumber(user.phone_number)}
                </p>
              </>
            ) : (
              <>
                <Skeleton className='h-3.5 w-[140px]' />
                <Skeleton className='h-3 w-[100px]' />
              </>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to='/profile'>
              <BadgeCheckIcon />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to='/history'>
              <HistoryIcon />
              History
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-red-500'>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
