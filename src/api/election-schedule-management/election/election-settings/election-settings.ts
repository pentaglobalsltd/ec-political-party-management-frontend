import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';
import {
  ElectionSettingsResponseType,
  ElectionSettingsSearchProps,
} from '@type/election-declaration-management/election/election-settings/election-settings-types';
import {
  CreateElectionSettingsType,
  DeleteElectionSettingsResponse,
  ElectionSettingsResponse,
} from '@type/election-declaration-management/election/election-settings';

export interface PropsApiGetElectionSettings {
  searchItems: ElectionSettingsSearchProps;
  page?: number;
  size?: number;
}

export const apiGetElectionSettingsAggregated = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    searchItems,
    page,
    size,
  }: PropsApiGetElectionSettings): Promise<{
    data: ElectionSettingsResponseType;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(URLS.GET_ELECTION_SETTINGS_AGGREGATED, {
      page: page as number,
      size: size as number,
      electionTypeId: searchItems?.electionTypeId as number,
      electionScheduleId: searchItems?.electionScheduleId as number,
      candidateTypeId: searchItems?.candidateTypeId as number,
      zillaId: searchItems?.zillaId as number,
      constituencyId: searchItems?.constituencyId as number,
      electionAreaReorganized: searchItems?.electionAreaReorganized as string,
      isCaseAvailable: searchItems?.isCaseAvailable as string,
      isActive: searchItems?.isActive as string,
    });

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const createElectionSettings = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    data: CreateElectionSettingsType[],
  ): Promise<{
    data: ElectionSettingsResponse;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.post(
        URLS.CREATE_ELECTION_SETTINGS,
        data,
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const deleteElectionSettingsAPI = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    id: string | number,
  ): Promise<{
    data: DeleteElectionSettingsResponse;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.delete(
        URLS.DELETE_ELECTION_SETTINGS(id),
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
