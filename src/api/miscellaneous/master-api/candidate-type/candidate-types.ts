import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';
import { URLS } from '@constants/urls';
import { noAuthMasterApi } from '@helpers/interceptors/master-data-no-auth';
import { CandidateTypesResProp } from '@type/candidate-info-management/operator-view/candidate-types';

export const getCandidateTypes = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    electionTypeId?: string | number,
  ): Promise<{ data: CandidateTypesResProp }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(URLS.GET_CANDIDATE_TYPES_ONS, {
      electionTypeId: electionTypeId as number,
    });

    isRequestInProcess = true;

    try {
      const response = await noAuthMasterApi.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
