import axios from 'axios';
import { URLS } from '@constants/urls';
import { masterApi } from '@helpers/interceptors/master-data';
import { MaritalStatusesTypeRes } from '@type/candidate-info-management/candidate-confirmation/marital-statuses';

export const getMaritalStatuses = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (): Promise<{
    data: MaritalStatusesTypeRes;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await masterApi.get(URLS.GET_MARITAL_STATUSES());
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
