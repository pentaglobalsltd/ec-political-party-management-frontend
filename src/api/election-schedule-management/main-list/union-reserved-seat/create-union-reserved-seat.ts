import axios from 'axios';
import { URLS } from '@constants/urls';
import {
  CreateUnionReservedSeat,
  CreateUnionReservedSeatResponse,
} from '@type/election-declaration-management/main-list/union-reserved-seat/create-union-reserved-seat-types';
import { masterApi } from '@helpers/interceptors/master-data';

export const createUnionReservedSeat = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    data: CreateUnionReservedSeat,
  ): Promise<{ data: CreateUnionReservedSeatResponse }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await masterApi.post(URLS.CREATE_UNION_RESERVED_WARD, {
        ...data,
      });

      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
