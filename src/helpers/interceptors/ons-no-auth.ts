// ======= noAuthApi

import axios from 'axios';
import { headers, onResponseSuccess } from '.';

export const onsNoAuthApi = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/`,
  headers,
});

onsNoAuthApi.interceptors.response.use(onResponseSuccess);
