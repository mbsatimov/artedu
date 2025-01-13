import { api } from '@/utils/api/instance.ts';

export const postCoursesTask = ({
  id,
  config,
  data
}: RequestConfig<CourseTaskRequestData> & { id: number | string }) =>
  api.post(`courses/${id}/task`, data, config);
