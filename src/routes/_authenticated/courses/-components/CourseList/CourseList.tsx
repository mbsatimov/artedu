import { Link } from '@tanstack/react-router';
import { formatDistanceToNowStrict } from 'date-fns';

import { Card, CardContent, CardHeader, CardTitle, Spinner } from '@/components/ui';

import { useCourseList } from './hooks';

export const CourseList = () => {
  const { state } = useCourseList();

  if (state.isFetching)
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
    <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4'>
      {state.courses?.map((course) => (
        <Card key={course.id} className='relative overflow-hidden'>
          <Link className='group' params={{ id: String(course.id) }} to='/courses/$id'>
            <img
              alt={course.title}
              className='aspect-video w-full origin-bottom object-cover transition-transform group-hover:scale-[1.02]'
              height={300}
              src={course.image}
              width={300}
            />
            <CardHeader className='p-3'>
              <CardTitle className='line-clamp-2 text-base leading-none'>{course.title}</CardTitle>
            </CardHeader>
          </Link>
          <CardContent className='p-3 pt-0'>
            <div className='flex gap-1 text-sm font-medium'>
              <span className='text-muted-foreground'>
                {course.views_count.toLocaleString()} views
              </span>
              <span className='text-muted-foreground'>-</span>
              <span className='text-muted-foreground'>
                {formatDistanceToNowStrict(course.created_at)} ago
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
