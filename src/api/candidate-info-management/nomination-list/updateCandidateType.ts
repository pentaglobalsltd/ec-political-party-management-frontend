import axios from 'axios';
import { URLS } from '@constants/urls';
import onsApi from '@helpers/interceptors/ons';
import { CandidateTypeUpdateValueType } from '@containers/candidate-info-management/controller-list/candidate-management/constants';

export interface Props {
  candidateTypeId: number;
}

export const updateCandidateTypeApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
    candidateTypeId,
  }: CandidateTypeUpdateValueType): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.put(
        URLS.UPDATE_CANDIDATE_TYPE_CHANGE({
          electionSettingsId,
          candidateElectionDetailsId,
          candidateTypeId,
        }),
      );
      return {
        data: response,
      };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
