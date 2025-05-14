import axios from 'axios';
import { headers, onResponseError, onResponseSuccess } from '.';
import { getStorage } from '@utils/local-store';
import { LS_KEYS } from '@constants/local-store';

export const customAuthApi = axios.create({
  baseURL: `${import.meta.env.VITE_CUSTOM_AUTH_URL}/`,
  headers,
});

customAuthApi.interceptors.request.use(function (config) {
  const token = getStorage(LS_KEYS.AUTH_TOKEN);
  // const token = 'Test Token';
  config.headers.Authorization = 'Bearer ' + token;
  return config;
});

customAuthApi.interceptors.response.use(onResponseSuccess, onResponseError);
