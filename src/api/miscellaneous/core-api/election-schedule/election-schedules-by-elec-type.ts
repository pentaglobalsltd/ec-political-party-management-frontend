import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';
import { URLS } from '@constants/urls';
import { ElectionSchedulesRes } from '@type/election-schedule/election-schedules-types';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export const getElectionSchedules = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    electionId: string | number,
    isActive: boolean = true,
  ): Promise<{ data: ElectionSchedulesRes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.get(
        encodeQuery(URLS.GET_ELECTION_SCHEDULES(electionId), {
          ...(isActive && { isActive }), // TODO:: check isActive with false
        }),
      );

      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
