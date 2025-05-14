import axios from 'axios';
import { URLS } from '@constants/urls';
import { masterApi } from '@helpers/interceptors/master-data';
import { encodeQuery } from '@pentabd/ui';

export interface FetchUnionsByUpazila {
  upazilaId: string | number;
  municipalityId?: string | number;
  rmoEn?: string;
}

export const fetchUnionsByUpazila = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    upazilaId,
    municipalityId,
    rmoEn,
  }: FetchUnionsByUpazila): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    const url = encodeQuery(URLS.GET_UNION_BY_UPAZILA(upazilaId), {
      municipalityId: municipalityId as number,
      rmoEn: rmoEn as string,
    });

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
