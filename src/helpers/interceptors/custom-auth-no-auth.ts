import axios from 'axios';
import { headers, onResponseSuccess } from '.';

export const noAuthCustomAuthApi = axios.create({
  baseURL: `${import.meta.env.VITE_CUSTOM_AUTH_URL}/`,
  headers,
});

noAuthCustomAuthApi.interceptors.response.use(onResponseSuccess);
