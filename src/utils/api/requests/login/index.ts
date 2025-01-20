import { api } from '@/utils/api/instance.ts';

export const postLogin = ({ config, data }: RequestConfig<LoginRequestData>) =>
  api.post<LoginResponse>('login/', data, config);
