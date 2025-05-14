import axios from 'axios';
import { URLS } from '@constants/urls';

import { ElectionSchedulesConstituenciesRes } from '@type/election-schedule/election-schedule-constituencies-types';
import { encodeQuery } from '@pentabd/ui';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export const getElectionSchedulesCandidateTypeConstituencies = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    electionSchedulesId: string | number,
    electionSchedulesZillaId: string | number,
    candidateTypeId: string | number,
    upazillaId?: string | number,
    isActive?: boolean,
  ): Promise<{ data: ElectionSchedulesConstituenciesRes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.get(
        encodeQuery(
          URLS.GET_ELECTION_SCHEDULES_CANDIDATE_TYPE_CONSTITUENCIES(
            electionSchedulesId,
            electionSchedulesZillaId,
            candidateTypeId,
          ),
          {
            ...(upazillaId && { upazillaId: upazillaId }),
            ...(isActive && { isActive }), // TODO:: check isActive with false
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
