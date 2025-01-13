import { api } from '@/utils/api/instance';

export const patchPersonalInfo = ({ data, config }: RequestConfig<PersonalInfoRequestData>) =>
  api.patch('personal-info', data, config);

export const patchSecurity = ({ data, config }: RequestConfig<SecurityRequestData>) =>
  api.patch('security', data, config);
