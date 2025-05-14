import { URLS } from '@constants/urls';
import { masterApi } from '@helpers/interceptors/master-data';
import axios from 'axios';

export interface DeleteAgencyResponse {
  data?: any;
  status?: number;
  statusText?: string;
}

export const deleteAgencyAPI = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    id: string | number,
  ): Promise<{
    data: DeleteAgencyResponse;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await masterApi.delete(URLS.DELETE_AGENCY_BY_ID(id));
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
