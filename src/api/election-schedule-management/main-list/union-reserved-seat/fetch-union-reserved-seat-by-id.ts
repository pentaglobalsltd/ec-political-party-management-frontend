import axios from 'axios';
import { URLS } from '@constants/urls';
import { masterApi } from '@helpers/interceptors/master-data';
import { GetUnionReservedSeatResponseType } from '@type/election-declaration-management/main-list/union-reserved-seat/get-union-reserved-seat-types';

export const fetchReserveUnionWardById = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    id: string | number,
  ): Promise<{ data: GetUnionReservedSeatResponseType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await masterApi.get(URLS.UPDATE_UNION_RESERVED_WARD(id));
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
