import axios from 'axios';
import { headers, onResponseSuccess } from '.';

export const noAuthMasterApi = axios.create({
  baseURL: `${import.meta.env.VITE_MASTER_DATA_URL}/`,
  headers,
});

noAuthMasterApi.interceptors.response.use(onResponseSuccess);
