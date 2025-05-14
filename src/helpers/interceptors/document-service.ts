import axios from 'axios';
import { headers, onResponseSuccess } from '.';
import { getStorage } from '@utils/local-store';
import { LS_KEYS } from '@constants/local-store';

export const documentServiceApi = axios.create({
  baseURL: `${import.meta.env.VITE_DOCUMENT_UPLOAD_URL}/`,
  headers,
});

documentServiceApi.interceptors.request.use(function (config) {
  const token = getStorage(LS_KEYS.AUTH_TOKEN);
  config.headers.Authorization = 'Bearer ' + token;
  return config;
});

documentServiceApi.interceptors.response.use(onResponseSuccess);
