import axios from 'axios';

import { URLS } from '@constants/urls';
import onsApi from '@helpers/interceptors/ons';
import {
  CreateIncomeSourceDetailsType,
  GetIncomeSourceDetails,
  IncomeSourceDetailsType,
  OtherFundingsType,
  OwnEarningType,
  RelativeFundingsType,
  UpdateOtherFundingType,
  UpdateRelativeFundingType,
  UpdateSelfFundingType,
} from '@type/candidate-info-management/operator-view/income-source-details/income-source-details-first-part';
import { UrlType } from '@type/url-type';

export const createIncomeSourceDetails = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    data,
    electionSettingsId,
    candidateElectionDetailId,
  }: CreateIncomeSourceDetailsType): Promise<{
    data: IncomeSourceDetailsType;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.post(
        URLS.CREATE_INCOME_SOURCE_DETAILS({
          electionSettingsId,
          candidateElectionDetailId,
        }),
        {
          ...data,
        },
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

export const getIncomeSourceDetails = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailId,
  }: UrlType): Promise<{
    data: GetIncomeSourceDetails;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.get(
        URLS.GET_INCOME_SOURCE_DETAILS({
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

export const updateSelfFunding = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailId,
    data,
    selfFundingId,
  }: UpdateSelfFundingType): Promise<{ data: OwnEarningType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.put(
        URLS.UPDATE_SELF_FUNDING({
          electionSettingsId,
          candidateElectionDetailId,
          selfFundingId,
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

export const updateRelativeFunding = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailId,
    data,
    relativeFundingId,
  }: UpdateRelativeFundingType): Promise<{ data: RelativeFundingsType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.put(
        URLS.UPDATE_RELATIVE_FUNDING({
          electionSettingsId,
          candidateElectionDetailId,
          relativeFundingId,
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

export const updateOtherFunding = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailId,
    data,
    otherFundingId,
  }: UpdateOtherFundingType): Promise<{ data: OtherFundingsType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.put(
        URLS.UPDATE_OTHER_FUNDING({
          electionSettingsId,
          candidateElectionDetailId,
          otherFundingId,
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
