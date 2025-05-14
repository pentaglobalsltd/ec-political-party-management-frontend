import { URLS } from '@constants/urls';
import onsApi from '@helpers/interceptors/ons';
import {
  IncomeSourceDetailsSecondPart,
  IncomeSourceDetailsSecondPartPropsType,
} from '@type/candidate-info-management/operator-view/income-source-details/income-source-details-second-part';
import { UrlType } from '@type/url-type';
import axios from 'axios';

export const createIncomeSourceDetailsSecondPart = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    data,
    electionSettingsId,
    candidateElectionDetailId,
  }: IncomeSourceDetailsSecondPartPropsType): Promise<{
    data: IncomeSourceDetailsSecondPart;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.post(
        URLS.CREATE_INCOME_SOURCE_DETAILS_SECOND_PART({
          electionSettingsId,
          candidateElectionDetailId,
        }),
        {
          ...data,
        },
      );
      return { data: response.data.result };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const getIncomeSourceDetailsSecondPart = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailId,
  }: UrlType): Promise<{
    data: IncomeSourceDetailsSecondPart;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.get(
        URLS.GET_INCOME_SOURCE_DETAILS_SECOND_PART({
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
