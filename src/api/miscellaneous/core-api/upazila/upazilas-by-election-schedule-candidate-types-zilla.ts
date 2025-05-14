import axios from 'axios';

import { URLS } from '@constants/urls';
import { UpazilasByZillasType } from '@type/upazilas-by-zillas-types';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export const getUpazilasByElectionScheduleCandidateTypesZillasApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionScheduleId,
    candidateTypeId,
    zillaId,
  }: {
    candidateTypeId: string | number;
    electionScheduleId: string | number;
    zillaId: string | number;
  }): Promise<{ data: UpazilasByZillasType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;
    try {
      const response = await configurationServiceApi.get(
        URLS.GET_UPAZILAS_BY_ELECTION_SCHEDULE_CANDIDATE_TYPES_ZILLAS(
          electionScheduleId,
          candidateTypeId,
          zillaId,
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
