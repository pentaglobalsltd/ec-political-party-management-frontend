import axios from 'axios';
import { URLS } from '@constants/urls';
import { masterApi } from '@helpers/interceptors/master-data';

export const createPollingInstitute = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (data: any): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await masterApi.post(URLS.CREATE_POLLING_INSTITUTE, {
        ...data,
      });
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
