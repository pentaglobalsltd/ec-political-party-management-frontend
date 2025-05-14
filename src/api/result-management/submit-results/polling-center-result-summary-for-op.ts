import axios from 'axios';
import { URLS } from '@constants/urls';
import { ecRmsService } from '@helpers/interceptors/ec-rms-service';

export const fetchPollingCenterResultSummaryForOp = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({ scheduleId }: any): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await ecRmsService.get(
        URLS.GET_POLLING_CENTER_RESULT_SUMMARY_FOR_OP({ scheduleId }),
      );

      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
