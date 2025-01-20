import { api } from '@/utils/api/instance.ts';

export const getHistory = (requestConfig?: RequestConfig) =>
  api.get<CoursesResponse>('history/', requestConfig?.config);
