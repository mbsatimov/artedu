import type { HTMLAttributes } from 'react';

import { Link } from '@tanstack/react-router';

import { Button, Input, PasswordInput } from '@/components/ui';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { PhoneInput } from '@/components/ui/phone-input.tsx';
import { cn } from '@/lib/utils';

import { useRegisterForm } from './hooks';

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const RegisterForm = ({ className, ...props }: Props) => {
  const { form, state, functions } = useRegisterForm();

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(functions.onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter first name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='first_name'
              control={form.control}
            />
            <FormField
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter last name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='last_name'
              control={form.control}
            />
            <FormField
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <PhoneInput placeholder='+998 XX XXX XX XX' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='phone_number'
              control={form.control}
            />
            <FormField
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='password'
              control={form.control}
            />
            <FormField
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='password_confirm'
              control={form.control}
            />
            <Button className='mt-2' type='submit' loading={state.isPending}>
              Sign Up
            </Button>
          </div>
          <div className='mt-4 text-center text-sm'>
            Have an account?{' '}
            <Link className='underline underline-offset-4' to='/login'>
              Login
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};
