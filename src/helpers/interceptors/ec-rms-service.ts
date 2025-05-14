import axios from 'axios';
import { headers, onResponseError, onResponseSuccess } from '.';
import { getStorage } from '@utils/local-store';
import { LS_KEYS } from '@constants/local-store';

export const ecRmsService = axios.create({
  baseURL: `${import.meta.env.VITE_EC_RMS_SERVICE_URL}/`,
  headers,
});

ecRmsService.interceptors.request.use(function (config) {
  const token = getStorage(LS_KEYS.AUTH_TOKEN);
  config.headers.Authorization = 'Bearer ' + token;
  return config;
});

ecRmsService.interceptors.response.use(onResponseSuccess, onResponseError);
