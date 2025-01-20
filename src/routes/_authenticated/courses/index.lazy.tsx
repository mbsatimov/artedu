import { createLazyFileRoute } from '@tanstack/react-router';

import { Main } from '@/components/Layout';

import { CourseList, CourseToolbar } from './-components';

const MainPage = () => {
  return (
    <Main className='space-y-3'>
      <div>
        <h1 className='text-2xl font-bold'>Courses</h1>
        <p className='text-muted-foreground'>
          All courses that you can access for free and improve your skills.
        </p>
      </div>
      <CourseToolbar />
      <CourseList />
    </Main>
  );
};

export const Route = createLazyFileRoute('/_authenticated/courses/')({
  component: MainPage
});
