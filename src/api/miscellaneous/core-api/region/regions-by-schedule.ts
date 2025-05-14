import axios from 'axios';
import { URLS } from '@constants/urls';
import { ElectionSchedulesRegionsRes } from '@type/election-schedule/regions';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export const getElectionSchedulesRegions = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    electionSchedulesId: string | number,
  ): Promise<{ data: ElectionSchedulesRegionsRes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.get(
        URLS.GET_ELECTION_SCHEDULES_REGIONS_ONS(electionSchedulesId),
      );

      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
