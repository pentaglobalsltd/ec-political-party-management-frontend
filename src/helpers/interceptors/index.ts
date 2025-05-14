import axios from 'axios';
import { performResponseData } from '../../utils/api';
import { removeStorage } from '@utils/local-store';
import { LS_KEYS } from '@constants/local-store';
import { URLS } from '@constants/urls';
import { ROUTES } from '@constants/routes';
import { toast } from 'react-toastify';

export const headers = {
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Headers':
  //   'Origin, X-Requested-With, Content-Type, Accept',
  //   'Content-Type': 'application/x-www-form-urlencoded',
  //   Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const onResponseSuccess = (response: any) => {
  const { data } = response;

  return Promise.resolve({
    ...response,
    data: performResponseData(data),
  });
};

export const onResponseError = (error: any) => {
  if (error?.response?.status === 401 && error?.config?.url !== URLS.SIGN_OUT) {
    removeStorage(LS_KEYS.AUTH_TOKEN);
    const redirectPath =
      import.meta.env.VITE_AUTH_GRANT_FLOW === 'true'
        ? ROUTES.HOME
        : ROUTES.SIGN_IN;
    window.location.replace(redirectPath);
  }

  if (error?.response?.status === 403) {
    toast.error('দুঃখিত, আপনি এই কাজটি করার জন্য অনুমতি প্রাপ্ত নন।');
  }

  return Promise.reject(error);
};

// ======= spec
//  Todo :: may delete later
export const specApi = axios.create({
  baseURL: `http://127.0.0.1:8077/`,
  headers,
});

specApi.interceptors.response.use(onResponseSuccess);

// =======
