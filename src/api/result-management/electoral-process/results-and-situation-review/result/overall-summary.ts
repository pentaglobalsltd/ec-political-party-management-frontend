import axios from 'axios';

import { URLS } from '@constants/urls';
import { ecRmsService } from '@helpers/interceptors/ec-rms-service';

export const fetchOverallSummary = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionScheduleId,
    electionSettingsId,
  }: {
    electionScheduleId: string | number;
    electionSettingsId: string | number;
  }): Promise<{
    data: any;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = URLS.GET_OVERALL_SUMMARY(
      electionScheduleId,
      electionSettingsId,
    );

    isRequestInProcess = true;

    try {
      const response = await ecRmsService.get(url);

      const data = {
        data: response.data,
        status: response.status,
      };
      return { data };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
