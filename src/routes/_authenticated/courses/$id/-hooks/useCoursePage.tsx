import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { getCoursesById } from '@/utils/api/requests';

import { Route } from '../index.lazy.tsx';

export const useCoursePage = () => {
  const { id } = Route.useParams();

  const [isTaskSolving, setIsTaskSolving] = React.useState<boolean>(false);

  const getCourseByIdQuery = useQuery({
    queryKey: ['course', id],
    queryFn: () => getCoursesById({ id })
  });

  const course: Course = {
    id: 1,
    title: 'Hello world',
    description: 'Hello world',
    end_date: '2024-12-12T12:12:12',
    video_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    picture_url: '/placeholder.png',
    views_count: 2000,
    has_homework: true,
    published_date: '2024-12-12T12:12:12',
    task: {
      quiz: [
        {
          id: 1,
          question: 'Question 1',
          options: [
            {
              id: 1,
              label: 'Option 1'
            },
            {
              id: 2,
              label: 'Option 2'
            },
            {
              id: 3,
              label: 'Option 3'
            }
          ]
        },
        {
          id: 2,
          question: 'Question 2',
          options: [
            {
              id: 1,
              label: 'Option 1'
            },
            {
              id: 2,
              label: 'Option 2'
            },
            {
              id: 3,
              label: 'Option 3'
            }
          ]
        }
      ]
    }
  };

  const onStartSolvingTask = () => {
    setIsTaskSolving(true);
  };

  return {
    state: {
      isTaskSolving,
      isLoading: getCourseByIdQuery.isLoading,
      course: course || getCourseByIdQuery.data?.data
    },
    functions: {
      onStartSolvingTask
    }
  };
};
