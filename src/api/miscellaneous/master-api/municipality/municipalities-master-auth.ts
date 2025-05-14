import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { masterApi } from '@helpers/interceptors/master-data';

interface Props {
  zillaId?: string | number;
  regionId?: string | number;
  rmoEn?: string;
}

export const getMunicipalities = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    zillaId,
    regionId,
    rmoEn,
  }: Props): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(URLS.GET_MUNICIPALITIES, {
      regionId: regionId as number,
      zillaId: zillaId as number,
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
