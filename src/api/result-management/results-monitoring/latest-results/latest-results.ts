import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import {
  LatestResultsPathParams,
  LatestResultsResponseType,
} from '@type/result-management/result-monitoring/latest-results-obtained/latest-results-obtained-types';
import { ecRmsService } from '@helpers/interceptors/ec-rms-service';

export const fetchLatestResultsList = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionScheduleId,
    electionSettingsId,
    candidateTypeId,
  }: LatestResultsPathParams): Promise<{
    data: LatestResultsResponseType;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await ecRmsService.get(
        encodeQuery(
          URLS.GET_LATEST_RESULTS_OBTAINED({
            electionScheduleId,
          }),
          {
            ...(electionSettingsId !== '' && {
              settingIds: electionSettingsId,
            }),
            ...(candidateTypeId !== undefined && {
              candidateTypeIds: candidateTypeId,
            }),
          },
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
