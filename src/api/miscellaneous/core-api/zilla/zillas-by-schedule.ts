import axios from 'axios';
import { URLS } from '@constants/urls';
import { ElectionSchedulesZillasRes } from '@type/election-schedule/election-schedule-zillas-type';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export const getElectionSchedulesZillas = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    electionSchedulesId: string | number,
  ): Promise<{ data: ElectionSchedulesZillasRes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.get(
        URLS.GET_ELECTION_SCHEDULES_ZILLAS(electionSchedulesId),
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
