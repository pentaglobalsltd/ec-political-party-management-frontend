import axios from 'axios';

import { URLS } from '@constants/urls';
import { ElectionSchedulesRes } from '@type/election-schedule/election-schedules-types';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export const getElectionSchedulesWithDate = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    electionId: string | number,
  ): Promise<{ data: ElectionSchedulesRes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.get(
        URLS.GET_ELECTION_SCHEDULES_WITH_DATE(electionId),
      );

      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
