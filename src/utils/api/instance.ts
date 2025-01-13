import axios from 'axios';
import Cookies from 'js-cookie';

import { ACCESS_TOKEN } from '@/utils/stores';

const api = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3000/api/v1'
});

api.interceptors.request.use((config) => {
  const token = Cookies.get(ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { api };
