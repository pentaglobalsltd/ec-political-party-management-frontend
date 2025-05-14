import axios from 'axios';
import { URLS } from '@constants/urls';
import {
  CreatePollingPersonnelAllocate,
  PollingPersonnelAllocate,
} from '@type/center-officer-management/polling-center/polling-personnel-allocate';
import { pollingPersonnelApi } from '@helpers/interceptors/polling-personnel';

export const createPollingPersonnelAllocateApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    data: PollingPersonnelAllocate,
  ): Promise<{
    data: CreatePollingPersonnelAllocate;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await pollingPersonnelApi.post(
        URLS.CREATE_POLLING_PERSONNEL_ALLOCATE,
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
