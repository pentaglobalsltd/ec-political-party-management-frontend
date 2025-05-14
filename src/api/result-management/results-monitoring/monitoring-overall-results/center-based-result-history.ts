import axios from 'axios';
import { URLS } from '@constants/urls';
import { encodeQuery } from '@pentabd/ui';
import { CenterBasedResultHistoryPropsTypes } from '@type/result-management/result-monitoring/monitoring-overall-result-types';
import { ecRmsService } from '@helpers/interceptors/ec-rms-service';

export const fetchCenterBasedResultHistory = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    scheduleId,
    resultId,
    page,
    size,
  }: CenterBasedResultHistoryPropsTypes): Promise<{
    data: any;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    const url = encodeQuery(
      URLS.GET_CENTER_BASED_RESULT_HISTORY({ scheduleId, resultId }),
      {
        ...(page && { page: page }),
        ...(size && { size: size }),
      },
    );

    try {
      const response = await ecRmsService.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
