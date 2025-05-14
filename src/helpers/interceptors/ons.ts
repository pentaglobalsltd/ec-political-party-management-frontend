import axios from 'axios';
import { headers, onResponseError, onResponseSuccess } from '.';
import { getStorage } from '@utils/local-store';
import { LS_KEYS } from '@constants/local-store';

const onsApi = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/`,
  headers,
});

onsApi.interceptors.request.use(function (config) {
  const token = getStorage(LS_KEYS.AUTH_TOKEN);
  config.headers.Authorization = 'Bearer ' + token;
  return config;
});

onsApi.interceptors.response.use(onResponseSuccess, onResponseError);

export default onsApi;
