import axios from 'axios';
import { URLS } from '@constants/urls';
import onsApi from '@helpers/interceptors/ons';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import AffidavitStepOneType, {
  CreateAffidavitStepOnePropsType,
} from '@type/candidate-info-management/operator-view/affidavit-form/affidavit-step-one';

export const createAffidavitStepOne = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
  }: CreateAffidavitStepOnePropsType): Promise<{
    data: AffidavitStepOneType;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.post(
        URLS.CREATE_AFFIDAVIT_STEP_ONE({
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

export const getAffidavitStepOne = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes): Promise<{ data: AffidavitStepOneType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.get(
        URLS.GET_AFFIDAVIT_STEP_ONE({
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
