import axios from 'axios';
import { URLS } from '@constants/urls';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';
import {
  ElectionSettingsDetailsById,
  ElectionSettingsDetailsProps,
} from '@type/election-declaration-management/election-process/election-settings-details';

interface Props {
  data: ElectionSettingsDetailsById;
  electionSettingsDetailsId: string | number;
}
export const apiUpdateElectionSettingsDetailsById = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsDetailsId,
    data,
  }: Props): Promise<{
    data: ElectionSettingsDetailsProps;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.put(
        URLS.UPDATE_ELECTION_SETTINGS_DETAILS_BY_ID(electionSettingsDetailsId),
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
