import { useQuery } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';

import { getCategories } from '@/utils/api/requests';

export const useCourseToolbar = () => {
  const [currentCategory, setCurrentCategory] = useQueryState('category', { defaultValue: '' });
  const getCategoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  });

  const categories: Category[] = [
    {
      id: 2,
      name: 'Category 1'
    },
    {
      id: 3,
      name: 'Category 2'
    },
    {
      id: 4,
      name: 'Category 3'
    }
  ];

  return {
    state: {
      categories: categories || getCategoriesQuery.data?.data || [],
      isCategoriesLoading: getCategoriesQuery.isLoading,
      currentCategory
    },
    functions: {
      setCurrentCategory
    }
  };
};
