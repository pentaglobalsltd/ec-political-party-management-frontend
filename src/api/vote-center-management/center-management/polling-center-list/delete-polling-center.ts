import axios from 'axios';
import { URLS } from '@constants/urls';
import { DeletePollingCenterApi } from '@type/vote-center-management/delete-polling-center-types';
import { ecPollingCenterService } from '@helpers/interceptors/ec-polling-center-service';

export const deletePollingCenterApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    unionOrWardId,
    pollingCenterId,
  }: DeletePollingCenterApi): Promise<{
    data: any;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = URLS.DELETE_POLLING_CENTER({
      electionSettingsId,
      unionOrWardId,
      pollingCenterId,
    });

    isRequestInProcess = true;

    try {
      const response = await ecPollingCenterService.delete(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
