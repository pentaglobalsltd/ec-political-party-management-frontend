import axios from 'axios';
import { URLS } from '@constants/urls';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';
import { GetElectionScheduleResponse } from '@type/election-declaration-management/election/election-schedule/election-schedule';

export const getElectionScheduleAPI = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    id?: string | number,
  ): Promise<{ data: GetElectionScheduleResponse }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.get(
        URLS.GET_ELECTION_SCHEDULE_BY_ID(id),
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
