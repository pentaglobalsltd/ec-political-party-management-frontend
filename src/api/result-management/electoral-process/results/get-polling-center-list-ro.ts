import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { PollingCenterListFilter } from '@type/result-management/electoral-process/results/results';
import { ecRmsService } from '@helpers/interceptors/ec-rms-service';

export const fetchPollingCenterListForRo = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    scheduleId,
    electionSettings,
    status,
    page,
    size,
  }: PollingCenterListFilter): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(
      URLS.POLLING_CENTER_RESULT_LIST_RO(scheduleId, electionSettings),
      {
        ...(page && { page: page }),
        ...(size && { size: size }),
        ...(status && { status: status }),
      },
    );

    isRequestInProcess = true;

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
