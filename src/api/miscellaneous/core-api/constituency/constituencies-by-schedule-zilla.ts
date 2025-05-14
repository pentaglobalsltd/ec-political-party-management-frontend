import axios from 'axios';
import { URLS } from '@constants/urls';
import { ElectionSchedulesConstituenciesRes } from '@type/election-schedule/election-schedule-constituencies-types';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export const getElectionSchedulesConstituencies = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    electionSchedulesId: string | number,
    electionSchedulesZillaId: string | number,
  ): Promise<{ data: ElectionSchedulesConstituenciesRes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.get(
        URLS.GET_ELECTION_SCHEDULES_CONSTITUENCIES(
          electionSchedulesId,
          electionSchedulesZillaId,
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
