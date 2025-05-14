import axios from 'axios';
import { URLS } from '@constants/urls';
import { CreatePollingCenterApi } from '@type/vote-center-management/create-polling-center-types';
import { ecPollingCenterService } from '@helpers/interceptors/ec-polling-center-service';

export const createPollingCenterApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    unionOrWardId,
    reqBody,
  }: CreatePollingCenterApi): Promise<{
    data: any;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = URLS.CREATE_POTENTIAL_POLLING_CENTER({
      electionSettingsId,
      unionOrWardId,
    });

    isRequestInProcess = true;

    try {
      const response = await ecPollingCenterService.post(url, reqBody);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
