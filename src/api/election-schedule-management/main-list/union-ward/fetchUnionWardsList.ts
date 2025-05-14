import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';
import { URLS } from '@constants/urls';
import { masterApi } from '@helpers/interceptors/master-data';
import {
  GetUnionWardListResponseType,
  UnionWardQueryParams,
} from '@type/election-declaration-management/main-list/union-ward/union-ward-type';

export const fetchUnionsWards = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    params: UnionWardQueryParams,
  ): Promise<{ data: GetUnionWardListResponseType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    const url = encodeQuery(URLS.GET_UNIONS_WARDS, {
      ...params,
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
