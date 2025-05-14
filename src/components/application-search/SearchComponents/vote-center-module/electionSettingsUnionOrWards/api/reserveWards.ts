import axios from 'axios';
import { masterApi } from '@helpers/interceptors/master-data';
import { encodeQuery } from '@pentabd/ui';

export const apiReserveWards = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (filter?: {
    [key: string]: string | number;
  }): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    let apiEndPoint = `/reserved-wards`;

    if (filter) {
      apiEndPoint = encodeQuery(apiEndPoint, {
        municipalityId: filter?.municipalityId as number,
      });
    }

    isRequestInProcess = true;

    try {
      const response = await masterApi.get(apiEndPoint);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
