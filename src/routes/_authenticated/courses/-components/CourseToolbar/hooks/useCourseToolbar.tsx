import { useQuery } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';

import { getCategories } from '@/utils/api/requests';

export const useCourseToolbar = () => {
  const [currentCategory, setCurrentCategory] = useQueryState('category', { defaultValue: '' });
  const getCategoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  });

  return {
    state: {
      categories: getCategoriesQuery.data?.data.result || [],
      isCategoriesLoading: getCategoriesQuery.isLoading,
      currentCategory
    },
    functions: {
      setCurrentCategory
    }
  };
};
