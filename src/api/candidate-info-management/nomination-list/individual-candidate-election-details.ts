import axios from 'axios';
import { URLS } from '@constants/urls';
import { candidateManagementServiceApi } from '@helpers/interceptors/cms';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import { IndividualCandidateElectionDetails } from '@type/candidate-info-management/nomination-list-type';

export const getIndividualElectionDetails = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes): Promise<{ data: IndividualCandidateElectionDetails }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await candidateManagementServiceApi.get(
        URLS.GET_INDIVIDUAL_CANDIDATE_ELECTION_FULL_DETAILS({
          electionSettingsId,
          candidateElectionDetailsId,
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
