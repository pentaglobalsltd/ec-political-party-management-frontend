import axios from 'axios';
import { URLS } from '@constants/urls';
import { pollingPersonnelApi } from '@helpers/interceptors/polling-personnel';

export const getPollingPersonnelCenterSendCredential = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    pollingPersonnelCenterId,
  }: {
    pollingPersonnelCenterId: number;
  }): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await pollingPersonnelApi.get(
        URLS.GET_POLLING_PERSONNEL_CENTER_SEND_CREDENTIAL(
          pollingPersonnelCenterId,
        ),
      );

      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
