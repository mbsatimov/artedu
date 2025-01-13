import { useQuery } from '@tanstack/react-query';

import { useBasicQueryParams } from '@/hooks';
import { getCoursesHistory } from '@/utils/api/requests';

export const useCourseList = () => {
  const { search, page, size } = useBasicQueryParams();

  const getCoursesQuery = useQuery({
    queryKey: ['coursesHistory', search, page, size],
    queryFn: () => getCoursesHistory({ config: { params: { search, page, size } } })
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
      isLoading: getCoursesQuery.isLoading
    }
  };
};
