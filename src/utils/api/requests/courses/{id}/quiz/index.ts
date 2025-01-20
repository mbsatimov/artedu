import { api } from '@/utils/api/instance.ts';

export const postCoursesQuiz = ({
  id,
  config,
  data
}: RequestConfig<CourseTaskRequestData> & { id: number | string }) =>
  api.post(`courses/${id}/quiz/`, data, config);
