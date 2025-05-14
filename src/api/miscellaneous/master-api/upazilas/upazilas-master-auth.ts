import axios from 'axios';

import { URLS } from '@constants/urls';
import { masterApi } from '@helpers/interceptors/master-data';
import { encodeQuery } from '@pentabd/ui';

interface Props {
  zillaId?: string | number;
  regionId?: string | number;
}

export const fetchUpazilasAuth = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({ zillaId, regionId }: Props): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(URLS.GET_SUB_DISTRICT_LIST, {
      regionId: regionId as number,
      zillaId: zillaId as number,
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
