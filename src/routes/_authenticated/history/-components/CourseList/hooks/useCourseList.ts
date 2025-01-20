import { useQuery } from '@tanstack/react-query';

import { getHistory } from '@/utils/api/requests';

export const useCourseList = () => {
  const getCoursesQuery = useQuery({
    queryKey: ['history'],
    queryFn: () => getHistory()
  });

  return {
    state: {
      courses: getCoursesQuery.data?.data.result,
      isLoading: getCoursesQuery.isLoading
    }
  };
};
