import axios from 'axios';
import { CandidatePersonalInformationTypeRes } from '../../../types/candidate-info-management/candidate-confirmation/persona-info';
import { URLS } from '@constants/urls';
import onsApi from '@helpers/interceptors/ons';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';

export const getCandidatePersonalInformation = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes): Promise<{
    data: CandidatePersonalInformationTypeRes;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.get(
        URLS.GET_CANDIDATE_PERSONAL_INFO({
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
