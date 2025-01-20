import { api } from '@/utils/api/instance.ts';

export const getCoursesById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.get<CourseResponse>(`courses/${id}/`, config);
