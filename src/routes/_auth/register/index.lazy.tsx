import { createLazyFileRoute } from '@tanstack/react-router';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';

import { RegisterForm } from './-components';

const LoginPage = () => {
  return (
    <Card>
      <CardHeader className='flex flex-col space-y-2 text-left'>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Enter your credentials below <br />
          to register an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
};

export const Route = createLazyFileRoute('/_auth/register/')({
  component: LoginPage
});
