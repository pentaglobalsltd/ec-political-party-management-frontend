import axios from 'axios';
import { headers, onResponseError, onResponseSuccess } from '.';
import { getStorage } from '@utils/local-store';
import { LS_KEYS } from '@constants/local-store';

export const coreServiceApi = axios.create({
  baseURL: `${import.meta.env.VITE_CORE_SERVICE_URL}/`,
  headers,
});

coreServiceApi.interceptors.request.use(function (config) {
  const token = getStorage(LS_KEYS.AUTH_TOKEN);
  config.headers.Authorization = 'Bearer ' + token;
  return config;
});

coreServiceApi.interceptors.response.use(onResponseSuccess, onResponseError);
