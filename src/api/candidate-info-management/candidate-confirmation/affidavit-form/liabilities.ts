import axios from 'axios';
import { URLS } from '@constants/urls';
import onsApi from '@helpers/interceptors/ons';
import { LiabilitiesPropsType } from '@type/candidate-info-management/candidate-confirmation/affidavit-form/liabilities-type';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';

export const getLiabilities = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes): Promise<{ data: LiabilitiesPropsType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.get(
        URLS.GET_AFFIDAVIT_LIABILITIES({
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
