import { api } from '@/utils/api/instance';

export const getCourses = (requestConfig?: RequestConfig) =>
  api.get<CoursesResponse>('courses', requestConfig?.config);
