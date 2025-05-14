import axios from 'axios';
import { URLS } from '@constants/urls';
import { dataProviderApi } from '@helpers/interceptors/data-provider';

export const postPublishToApp = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await dataProviderApi.post(
        URLS.POLLING_INSTITUTE_DATA_PUBLISH,
        {},
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
