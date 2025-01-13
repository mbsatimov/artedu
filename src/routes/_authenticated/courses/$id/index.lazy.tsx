import { createLazyFileRoute } from '@tanstack/react-router';

import { Main } from '@/components/Layout';
import { Button, Separator, Spinner } from '@/components/ui';

import { CourseTask } from './-components';
import { useCoursePage } from './-hooks';

const CourseEditPage = () => {
  const { state, functions } = useCoursePage();

  if (state.isLoading)
    return (
      <div className='grid place-items-center mt-20'>
        <Spinner />
      </div>
    );

  return (
    <Main className='p-4'>
      {state.course && (
        <video
          className='w-full rounded-sm aspect-video bg-black'
          src={state.course.video_url}
          controls
        ></video>
      )}
      <h1 className='text-2xl py-2 font-bold'>{state.course.title}</h1>
      <div className='text-muted-foreground text-lg font-semibold'>
        {state.course.views_count.toLocaleString()} views
      </div>
      <Separator className='my-2' />
      <div dangerouslySetInnerHTML={{ __html: state.course.description }} />
      <Separator className='my-2' />
      {state.isTaskSolving ? (
        <CourseTask course={state.course} />
      ) : (
        <Button className='mt-6' size='lg' onClick={() => functions.onStartSolvingTask()}>
          Solve Tasks
        </Button>
      )}
    </Main>
  );
};

export const Route = createLazyFileRoute('/_authenticated/courses/$id/')({
  component: CourseEditPage
});
