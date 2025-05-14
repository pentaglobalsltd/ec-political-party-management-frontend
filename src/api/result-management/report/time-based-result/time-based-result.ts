import axios from 'axios';

import { encodeQuery } from '@pentabd/ui';
import { URLS } from '@constants/urls';
import {
  TimeBasedResultListParams,
  TimeBasedResultListResponse,
} from '@type/result-management/report/time-based-result/time-based-result-type';
import { reportViewerServiceApi } from '@helpers/interceptors/report-viewer';

export const fetchTimeBasedResultList = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    page,
    size,
    electionScheduleId,
    electionSettingsId,
  }: TimeBasedResultListParams): Promise<{
    data: TimeBasedResultListResponse;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(
      URLS.GET_TIME_BASED_REPORT(electionScheduleId, electionSettingsId),
      {
        ...(page && { page: page }),
        ...(size && { size: size }),
      },
    );

    isRequestInProcess = true;

    try {
      const response = await reportViewerServiceApi.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
