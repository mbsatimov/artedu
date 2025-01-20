import { useQuery } from '@tanstack/react-query';

import { getCoursesById } from '@/utils/api/requests';

import { Route } from '../index.lazy.tsx';

export const useCoursePage = () => {
  const { id } = Route.useParams();

  const getCourseByIdQuery = useQuery({
    queryKey: ['courses', id],
    queryFn: () => getCoursesById({ id })
  });

  return {
    state: {
      isLoading: getCourseByIdQuery.isLoading,
      course: getCourseByIdQuery.data?.data.result
    },
    functions: {}
  };
};
