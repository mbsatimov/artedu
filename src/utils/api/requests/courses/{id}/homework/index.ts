import { api } from '@/utils/api/instance.ts';

export const postCoursesHomework = ({
  id,
  config,
  data
}: RequestConfig<FormData> & { id: number | string }) =>
  api.post(`courses/${id}/homework/`, data, config);
