import axios from 'axios';
import { customAuthApi } from '@helpers/interceptors/custom-auth';
import { URLS } from '@constants/urls';

export const getRoles = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (userId: string): Promise<{ data: { roles: string[] } }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await customAuthApi.get(URLS.ROLES(userId));

      return { data: response.data };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
