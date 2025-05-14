import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { masterApi } from '@helpers/interceptors/master-data';

export const getConstituenciesUpazila = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    constituencyId,
  }: {
    constituencyId: string;
  }): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }
    const url = encodeQuery(URLS.GET_CONSTITUENCIES_UPAZILA, {
      constituencyIds: constituencyId as string,
    });

    isRequestInProcess = true;

    try {
      const response = await masterApi.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
