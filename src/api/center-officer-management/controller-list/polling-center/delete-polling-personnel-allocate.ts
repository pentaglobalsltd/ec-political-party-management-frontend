import axios from 'axios';
import { URLS } from '@constants/urls';
import { pollingPersonnelApi } from '@helpers/interceptors/polling-personnel';
import { DeletePollingPersonnelAllocate } from '@type/center-officer-management/polling-center/polling-personnel-allocate';

export const deletePollingPersonnelAllocateApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    id: string | number,
  ): Promise<{
    data: DeletePollingPersonnelAllocate;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await pollingPersonnelApi.delete(
        URLS.DELETE_POLLING_PERSONNEL_ALLOCATE(id),
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
