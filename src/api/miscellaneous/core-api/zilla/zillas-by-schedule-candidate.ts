import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';
import { URLS } from '@constants/urls';
import { ElectionSchedulesZillasRes } from '@type/election-schedule/election-schedule-zillas-type';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export const getElectionSchedulesCandidateTypeZillas = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    electionSchedulesId: string | number,
    candidateTypeId: string | number,
    regionId?: string | number,
  ): Promise<{ data: ElectionSchedulesZillasRes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(
      URLS.GET_ELECTION_SCHEDULES_CANDIDATE_TYPE_ZILLAS(
        electionSchedulesId,
        candidateTypeId,
      ),
      {
        regionId: regionId as string,
      },
    );

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
