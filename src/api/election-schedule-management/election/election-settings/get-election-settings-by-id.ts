import axios from 'axios';
import { URLS } from '@constants/urls';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';
import { GetElectionSettingsByIdResponseTypes } from '@type/election-declaration-management/election/election-settings/election-settings-types';

export const apiGetElectionSettingsById = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    electionSettingsId: number | string,
  ): Promise<{
    data: GetElectionSettingsByIdResponseTypes;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.get(
        URLS.GET_ELECTION_SETTINGS_BY_ID(electionSettingsId),
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
