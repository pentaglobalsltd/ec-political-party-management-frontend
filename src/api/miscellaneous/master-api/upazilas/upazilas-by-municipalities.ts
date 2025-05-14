import axios from 'axios';

import { URLS } from '@constants/urls';
import { masterApi } from '@helpers/interceptors/master-data';
import { encodeQuery } from '@pentabd/ui';

export const fetchUpazilasByMunicipalities = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    upazilasId,
    rmoEn,
  }: {
    upazilasId: number | string;
    rmoEn?: string;
  }): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(URLS.GET_UPAZILLA_MUNICIPALITIES(upazilasId), {
      rmoEn: rmoEn as string,
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
