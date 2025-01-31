import { createLazyFileRoute } from '@tanstack/react-router';
import { formatDistanceToNowStrict } from 'date-fns';

import { Main } from '@/components/Layout';
import {
  Button,
  Separator,
  Spinner,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui';

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

  const getYouTubeId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^/]+\/[^/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    );
    return match ? match[1] : null;
  };

  return (
    <Main className='p-4'>
      {state.course.video && (
        <div className='aspect-video'>
          <iframe
            className='aspect-video w-full rounded-sm'
            src={`https://www.youtube.com/embed/${getYouTubeId(state.course.video)}`}
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
          />
        </div>
      )}
      <h1 className='py-2 text-xl font-bold md:text-2xl'>{state.course.title}</h1>
      <div className='text-sm font-semibold text-muted-foreground md:text-lg'>
        {state.course.views_count.toLocaleString()} views{' '}
        {formatDistanceToNowStrict(state.course.created_at)} ago
      </div>
      {state.course.description && (
        <>
          <Separator className='my-4 lg:my-8' />
          <div dangerouslySetInnerHTML={{ __html: state.course.description }} />
        </>
      )}
      <Separator className='my-4 lg:my-8' />
      {!!state.course.additional_materials.length && (
        <>
          <h2 className='py-2 text-lg font-bold md:text-xl'>Materials</h2>
          <ul className='mb-6 space-y-2'>
            {state.course.additional_materials.map((material) => (
              <li key={material.id}>
                <a
                  href={material.file}
                  className='rounded-md bg-primary/10 px-2 py-0.5 text-sm font-semibold text-primary'
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
      <h2 className='py-2 text-xl font-bold'>Tasks</h2>
      <Tabs className='w-[400px]'>
        <TabsList>
          <TabsTrigger value='quiz'>Quizzes</TabsTrigger>
          {state.course.homework && <TabsTrigger value='homework'>Homework</TabsTrigger>}
        </TabsList>
        <TabsContent value='quiz'>
          {state.course.test_result !== null ? (
            <div className='flex items-center gap-2 p-2'>
              <span className='font-semibold'>Your quiz result:</span>
              <span className='font-semibold text-primary'>
                {Math.round(state.course.test_result * 10) / 10}%
              </span>
            </div>
          ) : (
            <CourseQuiz course={state.course} />
          )}
        </TabsContent>
        {state.course.homework && (
          <TabsContent value='homework'>
            {state.course.student_homework ? (
              <div className='flex items-center gap-2 p-2 font-semibold'>Homework is uploaded</div>
            ) : (
              <>
                <div>
                  <Button asChild className='mt-2' variant='outline'>
                    <a href={state.course.homework} rel='noreferrer' target='_blank'>
                      Download Homework Task
                    </a>
                  </Button>
                </div>
                <CourseHomework />
              </>
            )}
          </TabsContent>
        )}
      </Tabs>
    </Main>
  );
};

export const Route = createLazyFileRoute('/_authenticated/courses/$id/')({
  component: CourseEditPage
});
