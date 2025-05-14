import axios from 'axios';
import { URLS } from '@constants/urls';
import { candidateManagementServiceApi } from '@helpers/interceptors/cms';

import { CandidateNominationStatisticsPaginatedProps } from '@type/candidate-info-management/candidate-nomination-statistics-types';

interface Props {
  electionTypeId: number | string;
  scheduleId: number | string;
}

export const getCandidateNominationStatistics = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionTypeId,
    scheduleId,
  }: Props): Promise<{ data: CandidateNominationStatisticsPaginatedProps }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;
    try {
      const response = await candidateManagementServiceApi.get(
        URLS.GET_CANDIDATE_ELECTION_STATISTICS({
          electionTypeId,
          scheduleId,
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
