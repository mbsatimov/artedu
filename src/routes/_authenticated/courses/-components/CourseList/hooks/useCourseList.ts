import { useQuery } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';

import { useBasicQueryParams } from '@/hooks';
import { getCourses } from '@/utils/api/requests';

export const useCourseList = () => {
  const { search, page, size } = useBasicQueryParams();
  const [currentCategory] = useQueryState('category');

  const getCoursesQuery = useQuery({
    queryKey: ['courses', search, page, size, currentCategory],
    queryFn: () =>
      getCourses({ config: { params: { search, page, size, category: currentCategory } } })
  });

  const data: Course[] = [
    {
      id: 1,
      title: 'Hello world',
      description: 'Hello world',
      picture_url: '/placeholder.png',
      end_date: '2024-12-12T12:12:12',
      views_count: 12000,
      video_url:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      published_date: '2024-12-12T12:12:12',
      has_homework: true,
      task: {
        quiz: [],
        homework_url: ''
      }
    },
    {
      id: 2,
      title: 'Hello world',
      description: 'Hello world',
      picture_url: '/placeholder.png',
      end_date: '2024-12-12T12:12:12',
      views_count: 12000,
      video_url:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      published_date: '2025-01-12T12:12:12',
      has_homework: true,
      task: {
        quiz: [],
        homework_url: ''
      }
    }
  ];

  return {
    state: {
      courses: data || getCoursesQuery.data?.data,
      page,
      size,
      isFetching: getCoursesQuery.isFetching
    }
  };
};
