import axios from 'axios';
import { URLS } from '@constants/urls';
import { ElectionSchedulesZillasRes } from '@type/election-schedule/election-schedule-zillas-type';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

// export const getElectionSchedulesZillas = (() => {
export const getZillasByScheduleRegion = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    electionSchedulesId: string | number,
    electionSchedulesRegionsId: string | number,
  ): Promise<{ data: ElectionSchedulesZillasRes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.get(
        URLS.GET_ELECTION_SCHEDULES_ZILLAS_ONS(
          electionSchedulesId,
          electionSchedulesRegionsId,
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
