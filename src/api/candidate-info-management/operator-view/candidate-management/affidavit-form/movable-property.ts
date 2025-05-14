import axios from 'axios';
import { URLS } from '@constants/urls';
import onsApi from '@helpers/interceptors/ons';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import {
  MovablePropertyPropType,
  MovablePropertyType,
} from '@type/candidate-info-management/operator-view/affidavit-form/movable-property';

export const createMovableProperty = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;
  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
  }: MovablePropertyPropType): Promise<{ data: MovablePropertyType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.post(
        URLS.CREATE_AFFIDAVIT_MOVABLE_PROPERTY({
          electionSettingsId,
          candidateElectionDetailsId,
        }),
        { ...data },
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

export const getMovableProperty = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes): Promise<{ data: MovablePropertyType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.get(
        URLS.GET_AFFIDAVIT_MOVABLE_PROPERTY({
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
