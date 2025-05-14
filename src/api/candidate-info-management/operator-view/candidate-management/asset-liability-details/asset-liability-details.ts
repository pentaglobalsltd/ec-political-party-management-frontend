import axios from 'axios';
import onsApi from '@helpers/interceptors/ons';
import { URLS } from '@constants/urls';
import { UrlType } from '@type/url-type';
import {
  AssetsType,
  CreateAssetLiabilityPropsType,
  UpdateAssetType,
  UpdateYearlyIncomeType,
  DeleteAssetType,
  DeleteYearlyIncomeType,
} from '@type/candidate-info-management/operator-view/asset-liabilities-form/asset-liabilities-form';

export const createAssetLiabilityDetails = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    data,
    electionSettingsId,
    candidateElectionDetailId,
  }: CreateAssetLiabilityPropsType): Promise<{
    data: AssetsType;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.post(
        URLS.CREATE_ASSET_LIABILITY_DETAILS({
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

export const getAssetLiabilityDetails = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailId,
  }: UrlType): Promise<{
    data: AssetsType;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.get(
        URLS.GET_ASSET_LIABILITY_DETAILS({
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

export const updateAssets = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailId,
    personalAssetId,
    data,
  }: UpdateAssetType): Promise<{
    data: AssetsType | undefined;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.put(
        URLS.UPDATE_ASSETS({
          electionSettingsId,
          candidateElectionDetailId,
          personalAssetId,
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

export const updateYearlyIncome = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailId,
    yearlyIncomeExpenditureId,
    data,
  }: UpdateYearlyIncomeType): Promise<{
    data: AssetsType | undefined;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.put(
        URLS.UPDATE_YEARLY_INCOME({
          electionSettingsId,
          candidateElectionDetailId,
          yearlyIncomeExpenditureId,
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

export const deleteAsset = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailId,
    personalAssetId,
  }: DeleteAssetType): Promise<{ status: number }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.delete(
        URLS.DELETE_ASSET({
          electionSettingsId,
          candidateElectionDetailId,
          personalAssetId,
        }),
      );

      return { status: response.status };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const deleteYearlyIncome = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailId,
    yearlyIncomeExpenditureId,
  }: DeleteYearlyIncomeType): Promise<{ status: number }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.delete(
        URLS.DELETE_YEARLY_INCOME({
          electionSettingsId,
          candidateElectionDetailId,
          yearlyIncomeExpenditureId,
        }),
      );

      return { status: response.status };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
