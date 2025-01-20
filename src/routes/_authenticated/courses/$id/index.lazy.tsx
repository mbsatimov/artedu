import { createLazyFileRoute } from '@tanstack/react-router';
import { formatDistanceToNowStrict } from 'date-fns';

import { Main } from '@/components/Layout';
import { Separator, Spinner, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';

import { CourseHomework, CourseQuiz } from './-components';
import { useCoursePage } from './-hooks';

const CourseEditPage = () => {
  const { state } = useCoursePage();

  if (state.isLoading)
    return (
      <div className='grid place-items-center pt-20'>
        <Spinner />
      </div>
    );

  if (!state.course) return null;

  return (
    <Main className='p-4'>
      {state.course && (
        <video
          className='w-full rounded-sm aspect-video bg-black'
          src={state.course.video}
          controls
        />
      )}
      <h1 className='text-2xl py-2 font-bold'>{state.course.title}</h1>
      <div className='text-muted-foreground text-lg font-semibold'>
        {state.course.views_count.toLocaleString()} views{' '}
        {formatDistanceToNowStrict(state.course.created_at)} ago
      </div>
      <Separator className='my-2' />
      <div dangerouslySetInnerHTML={{ __html: state.course.description }} />
      <Separator className='my-2' />
      {!!state.course.additional_materials.length && (
        <>
          <h2 className='text-xl py-2 font-bold'>Materials</h2>
          <ul className='space-y-2 mb-6'>
            {state.course.additional_materials.map((material) => (
              <li key={material.id}>
                <a
                  href={material.url}
                  className='text-primary bg-primary/10 font-semibold text-sm px-2 py-0.5 rounded-md'
                  rel='noreferrer'
                  target='_blank'
                >
                  {material.name ?? 'No name'}
                </a>
              </li>
            ))}
          </ul>
          <Separator className='my-2' />
        </>
      )}
      <h2 className='text-xl py-2 font-bold'>Tasks</h2>
      <Tabs className='w-[400px]'>
        <TabsList>
          <TabsTrigger value='quiz'>Solve quiz</TabsTrigger>
          <TabsTrigger value='homework'>Upload homework</TabsTrigger>
        </TabsList>
        <TabsContent value='quiz'>
          {state.course.test_result ? (
            <div className='flex items-center p-2 gap-2'>
              <span className='font-semibold'>Your quiz result:</span>
              <span className='font-semibold text-primary'>
                {Math.round(state.course.test_result * 10) / 10}%
              </span>
            </div>
          ) : (
            <CourseQuiz course={state.course} />
          )}
        </TabsContent>
        <TabsContent value='homework'>
          {state.course.homework ? (
            <div className='flex items-center p-2 font-semibold gap-2'>
              <a href={state.course.homework} className="text-primary" rel='noreferrer' target='_blank'>
                Homework
              </a>
              is already uploaded
            </div>
          ) : (
            <CourseHomework />
          )}
        </TabsContent>
      </Tabs>
    </Main>
  );
};

export const Route = createLazyFileRoute('/_authenticated/courses/$id/')({
  component: CourseEditPage
});
