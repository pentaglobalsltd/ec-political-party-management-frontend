import axios from 'axios';
import { URLS } from '@constants/urls';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import {
  GetJamanatPropsType,
  JamanatType,
  UpdateJamanatPropsType,
} from '@type/candidate-info-management/candidate-confirmation/collateral-form';
import onsApi from '@helpers/interceptors/ons';

export const getCollateralForm = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailId,
  }: UrlIdTypes): Promise<{ data: GetJamanatPropsType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.get(
        URLS.GET_COLLATERAL_FORM({
          electionSettingsId,
          candidateElectionDetailId,
        }),
      );
      return { data: response.data };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const updateCollateralForm = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailId,
    data,
  }: UpdateJamanatPropsType): Promise<{ data: JamanatType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.put(
        URLS.UPDATE_COLLATERAL_FORM({
          electionSettingsId,
          candidateElectionDetailId,
        }),
        { ...data },
      );

      return { data: response.data };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
