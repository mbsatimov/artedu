import { api } from '@/utils/api/instance.ts';

export const getCoursesHistory = (requestConfig?: RequestConfig) =>
  api.get<CoursesResponse>('courses/history', requestConfig?.config);
