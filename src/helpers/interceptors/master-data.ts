// ======= masterApi

import axios from 'axios';
import { headers, onResponseError, onResponseSuccess } from '.';
import { getStorage } from '@utils/local-store';
import { LS_KEYS } from '@constants/local-store';

export const masterApi = axios.create({
  baseURL: `${import.meta.env.VITE_MASTER_DATA_URL}/`,
  headers,
});

masterApi.interceptors.request.use(function (config) {
  const token = getStorage(LS_KEYS.AUTH_TOKEN);
  config.headers.Authorization = 'Bearer ' + token;
  return config;
});

masterApi.interceptors.response.use(onResponseSuccess, onResponseError);
