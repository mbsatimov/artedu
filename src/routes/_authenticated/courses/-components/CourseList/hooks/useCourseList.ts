import { useQuery } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';

import { useBasicQueryParams } from '@/hooks';
import { getCourses } from '@/utils/api/requests';

export const useCourseList = () => {
  const { search, page, size } = useBasicQueryParams();
  const [currentCategory] = useQueryState('category');

  const getCoursesQuery = useQuery({
    queryKey: ['courses', search, currentCategory],
    queryFn: () => getCourses({ config: { params: { q: search, category_id: currentCategory } } })
  });

  return {
    state: {
      courses: getCoursesQuery.data?.data.result,
      page,
      size,
      isFetching: getCoursesQuery.isFetching
    }
  };
};
