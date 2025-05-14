import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import {
  ElectionSettingsResponseType,
  ElectionSettingsSearchProps,
} from '@type/election-settings-types';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export interface PropsApiGetElectionSettings {
  searchItems: ElectionSettingsSearchProps;
  page?: number;
  size?: number;
}

export const apiGetElectionSettings = (() => {
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

    const url = encodeQuery(URLS.ELECTION_SETTINGS, {
      page: page as number,
      size: size as number,
      electionScheduleId: searchItems?.electionScheduleId as number,
      candidateTypeId: searchItems?.candidateTypeId as number,
      regionId: searchItems?.regionId as number,
      zillaId: searchItems?.zillaId as number,
      upazilaId: searchItems?.upazilaId as number,
      constituencyId: searchItems?.constituencyId as number,
      municipalityId: searchItems?.municipalityId as number,
      unionOrWardId: searchItems?.unionOrWardId as number,
      unionWardId: searchItems?.unionWardId as number,
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
