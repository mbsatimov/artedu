import { createLazyFileRoute } from '@tanstack/react-router';

import { Main } from '@/components/Layout';

import { CourseList } from './-components';

const HistoryPage = () => {
  return (
    <Main className='space-y-3'>
      <div className='mx-auto max-w-4xl space-y-3'>
        <h1 className='text-2xl font-bold'>History</h1>
        <CourseList />
      </div>
    </Main>
  );
};

export const Route = createLazyFileRoute('/_authenticated/history/')({
  component: HistoryPage
});
