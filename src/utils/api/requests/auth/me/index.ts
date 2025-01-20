import { api } from '@/utils/api/instance.ts';

export const getMe = (requestConfig?: RequestConfig) =>
  api.get<UserResponse>('auth/me/', requestConfig?.config);

export const patchMe = ({ data, config }: RequestConfig<ProfileRequestData>) =>
  api.patch('auth/me/', data, config);
