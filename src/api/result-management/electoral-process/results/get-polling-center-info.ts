import axios from 'axios';
import { URLS } from '@constants/urls';
import { PollingCenterInfo } from '@type/result-management/electoral-process/results/results';
import { ecRmsService } from '@helpers/interceptors/ec-rms-service';

export const fetchPollingCenterInfo = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    scheduleId,
    centerId,
    candidateTypeId,
  }: PollingCenterInfo): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }
    isRequestInProcess = true;

    try {
      const response = await ecRmsService.get(
        URLS.POLLING_CENTER_RESULT_SINGLE_INFO(
          scheduleId,
          centerId,
          candidateTypeId,
        ),
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
