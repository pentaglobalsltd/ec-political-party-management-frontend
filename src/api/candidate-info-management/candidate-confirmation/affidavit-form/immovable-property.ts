import axios from 'axios';
import { URLS } from '@constants/urls';
import onsApi from '@helpers/interceptors/ons';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import { ImmovablePropertyPropType } from '@type/candidate-info-management/candidate-confirmation/affidavit-form/immovable-property-type';

export const getImmovableProperty = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes): Promise<{ data: ImmovablePropertyPropType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.get(
        URLS.GET_AFFIDAVIT_IMMOVABLE_PROPERTY({
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
