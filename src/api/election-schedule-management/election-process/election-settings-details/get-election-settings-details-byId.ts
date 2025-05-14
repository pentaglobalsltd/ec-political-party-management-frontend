import axios from 'axios';
import { URLS } from '@constants/urls';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';
import { ElectionSettingsDetailsProps } from '@type/election-declaration-management/election-process/election-settings-details';

export const apiGetElectionSettingsDetailsById = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    electionSettingsDetailsId: number | string,
  ): Promise<{
    data: ElectionSettingsDetailsProps;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.get(
        URLS.GET_ELECTION_SETTINGS_DETAILS_BY_ID(electionSettingsDetailsId),
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
