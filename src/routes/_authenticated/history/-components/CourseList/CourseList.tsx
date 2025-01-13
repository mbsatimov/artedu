import { Link } from '@tanstack/react-router';
import { formatDistanceToNowStrict } from 'date-fns';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Spinner
} from '@/components/ui';

import { useCourseList } from './hooks';

export const CourseList = () => {
  const { state } = useCourseList();

  if (state.isLoading)
    return (
      <div className='grid place-items-center mt-20'>
        <Spinner />
      </div>
    );

  return (
    <div className='space-y-4'>
      {state.courses.map((course) => (
        <Card key={course.id} className='relative grid grid-cols-[auto,1fr] overflow-hidden'>
          <Link params={{ id: String(course.id) }} to='/courses/$id'>
            <img
              alt={course.title}
              className='aspect-video h-[150px] origin-bottom object-cover transition-transform group-hover:scale-[1.02]'
              src={course.picture_url || '/placeholder.png'}
            />
          </Link>
          <div className='flex-1'>
            <Link params={{ id: String(course.id) }} to='/courses/$id'>
              <CardHeader>
                <CardTitle className='text-lg leading-none'>{course.title}</CardTitle>
              </CardHeader>
            </Link>
            <CardContent>
              <div className='flex gap-1 text-sm'>
                <span className='text-muted-foreground'>
                  {course.views_count.toLocaleString()} views
                </span>
                <span className='text-muted-foreground'>-</span>
                <span className='text-muted-foreground'>
                  {formatDistanceToNowStrict(course.published_date)} ago
                </span>
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
};
