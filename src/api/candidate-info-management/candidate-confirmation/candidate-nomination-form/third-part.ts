import axios from 'axios';

import { ThirdPartPropType } from '@type/candidate-info-management/operator-view/candidate-nomination-form/third-part';
import { URLS } from '@constants/urls';
import onsApi from '@helpers/interceptors/ons';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';

export const getCandidateNominationFormThirdPart = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes): Promise<{ data: ThirdPartPropType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.get(
        URLS.GET_CANDIDATE_NOMINATION_FORM_THIRD_PART({
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
