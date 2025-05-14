import axios from 'axios';
import { URLS } from '@constants/urls';
import { ResultStatusListTypeResponse } from '@type/result-status-types';
import { ecRmsService } from '@helpers/interceptors/ec-rms-service';

export const fetchResultStatuses = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (): Promise<{ data: ResultStatusListTypeResponse }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await ecRmsService.get(URLS.GET_RESULT_STATUSES);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
