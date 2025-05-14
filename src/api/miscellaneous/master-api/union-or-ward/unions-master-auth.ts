import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { masterApi } from '@helpers/interceptors/master-data';

interface props {
  upazilaIds?: string;
  upazilaId?: number | string;
  regionId?: number | string;
  municipalityId?: number | string;
  rmoEn?: string;
}

export const fetchUnionsOrWardsAuth = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    upazilaIds,
    upazilaId,
    regionId,
    municipalityId,
    rmoEn,
  }: props): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(URLS.GET_UNIONS_OR_WARDS, {
      upazilaIds: upazilaIds as string,
      upazilaId: upazilaId as number,
      regionId: regionId as number,
      municipalityId: municipalityId as number,
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
