import axios from 'axios';

import { URLS } from '@constants/urls';
import onsApi from '@helpers/interceptors/ons';

import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import {
  FourthPartPropType,
  FourthPartType,
} from '@type/candidate-info-management/operator-view/candidate-nomination-form/fourth-part';

export const createCandidateNominationFormFourthPart = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;
  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
  }: FourthPartPropType): Promise<{ data: FourthPartType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.post(
        URLS.CREATE_CANDIDATE_NOMINATION_FORM_FOURTH_PART({
          electionSettingsId,
          candidateElectionDetailsId,
        }),
        { ...data },
      );

      return {
        data: response.data.result,
      };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const getCandidateNominationFormFourthPart = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes): Promise<{ data: FourthPartType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.get(
        URLS.GET_CANDIDATE_NOMINATION_FORM_FOURTH_PART({
          electionSettingsId,
          candidateElectionDetailsId,
        }),
      );

      return {
        data: response.data,
      };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
