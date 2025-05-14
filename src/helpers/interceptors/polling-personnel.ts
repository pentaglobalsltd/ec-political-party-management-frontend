import axios from 'axios';
import { headers, onResponseError, onResponseSuccess } from '.';
import { getStorage } from '@utils/local-store';
import { LS_KEYS } from '@constants/local-store';

export const pollingPersonnelApi = axios.create({
  baseURL: `${import.meta.env.VITE_POLLING_PERSONNEL_URL}/`,
  headers,
});

pollingPersonnelApi.interceptors.request.use(function (config) {
  const token = getStorage(LS_KEYS.AUTH_TOKEN);
  config.headers.Authorization = 'Bearer ' + token;
  return config;
});

pollingPersonnelApi.interceptors.response.use(
  onResponseSuccess,
  onResponseError,
);
