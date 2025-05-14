import axios from 'axios';
import { headers, onResponseError, onResponseSuccess } from '.';
import { getStorage } from '@utils/local-store';
import { LS_KEYS } from '@constants/local-store';

export const ecPollingCenterService = axios.create({
  baseURL: `${import.meta.env.VITE_EC_POLLING_CENTER_SERVICE_URL}/`,
  headers,
});

ecPollingCenterService.interceptors.request.use(function (config) {
  const token = getStorage(LS_KEYS.AUTH_TOKEN);
  config.headers.Authorization = 'Bearer ' + token;
  return config;
});

ecPollingCenterService.interceptors.response.use(
  onResponseSuccess,
  onResponseError,
);
