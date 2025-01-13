import { createLazyFileRoute } from '@tanstack/react-router';

import { Main } from '@/components/Layout';
import { useAuth } from '@/utils/stores';

import { PersonalInfoForm, SecurityForm } from './-components';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <Main>
      <div className='mx-auto max-w-3xl space-y-6'>
        <PersonalInfoForm defaultValues={user || undefined} />
        <SecurityForm />
      </div>
    </Main>
  );
};

export const Route = createLazyFileRoute('/_authenticated/profile/')({
  component: ProfilePage
});
