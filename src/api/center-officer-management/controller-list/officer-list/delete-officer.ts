import { URLS } from '@constants/urls';
import { pollingPersonnelApi } from '@helpers/interceptors/polling-personnel';
import axios from 'axios';

export interface DeleteOfficerResponse {
  data?: any;
  status?: number;
  statusText?: string;
}

export const deleteOfficerAPI = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    id: string | number,
  ): Promise<{
    data: DeleteOfficerResponse;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await pollingPersonnelApi.delete(
        URLS.DELETE_OFFICER(id),
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
