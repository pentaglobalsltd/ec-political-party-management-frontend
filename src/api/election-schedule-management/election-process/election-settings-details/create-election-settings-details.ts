import axios from 'axios';
import { URLS } from '@constants/urls';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';
import {
  ElectionSettingsDetailsById,
  ElectionSettingsDetailsProps,
} from '@type/election-declaration-management/election-process/election-settings-details';

export const createElectionSettingsDetails = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    data: ElectionSettingsDetailsById,
  ): Promise<{
    data: ElectionSettingsDetailsProps;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.post(
        URLS.CREATE_ELECTION_SETTINGS_DETAILS,
        { ...data },
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
