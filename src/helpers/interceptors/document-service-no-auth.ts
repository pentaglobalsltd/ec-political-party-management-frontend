import axios from 'axios';
import { headers, onResponseSuccess } from '.';

export const noAuthDocumentServiceApi = axios.create({
  baseURL: `${import.meta.env.VITE_DOCUMENT_UPLOAD_URL}/`,
  headers,
});

noAuthDocumentServiceApi.interceptors.response.use(onResponseSuccess);
