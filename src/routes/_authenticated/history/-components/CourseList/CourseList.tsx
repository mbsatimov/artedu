import { Link } from '@tanstack/react-router';
import { formatDistanceToNowStrict } from 'date-fns';

import { Card, CardContent, CardHeader, CardTitle, Spinner } from '@/components/ui';

import { useCourseList } from './hooks';

export const CourseList = () => {
  const { state } = useCourseList();

  if (state.isLoading)
    return (
      <div className='grid place-items-center pt-20'>
        <Spinner />
      </div>
    );

  if (!state.courses?.length)
    return (
      <div className='pt-20'>
        <h1 className='text-center font-bold text-muted-foreground'>No courses found</h1>
      </div>
    );

  return (
    <div className='space-y-4'>
      {state.courses.map((course) => (
        <Card key={course.id} className='relative grid grid-cols-[auto,1fr] overflow-hidden'>
          <Link params={{ id: String(course.id) }} to='/courses/$id'>
            <img
              alt={course.title}
              className='aspect-[3/2] h-[90px] origin-bottom object-cover transition-transform group-hover:scale-[1.02] sm:h-[120px] md:aspect-video md:h-[150px]'
              src={course.image}
            />
          </Link>
          <div className='flex-1'>
            <CardHeader className='p-3 pb-1'>
              <Link params={{ id: String(course.id) }} to='/courses/$id'>
                <CardTitle className='text-base leading-none md:text-lg'>{course.title}</CardTitle>
              </Link>
            </CardHeader>
            <CardContent className='p-3 pt-0'>
              <p className='text-sm text-muted-foreground'>
                {course.views_count.toLocaleString()} views -{' '}
                {formatDistanceToNowStrict(course.created_at)} ago
              </p>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
};
