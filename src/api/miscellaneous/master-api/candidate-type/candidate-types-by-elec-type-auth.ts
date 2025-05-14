import axios from 'axios';

import { URLS } from '@constants/urls';
import { masterApi } from '@helpers/interceptors/master-data';
import { ElectionCandidateTypesRes } from '@type/election-schedule/election-schedule-candidate-types';

export const getCandidateTypeByElecTypeAuth = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    electionId: string | number,
  ): Promise<{ data: ElectionCandidateTypesRes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await masterApi.get(
        URLS.GET_ELECTION_CANDIDATE_TYPES(electionId),
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
