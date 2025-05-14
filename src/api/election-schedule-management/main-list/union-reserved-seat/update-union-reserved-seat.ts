import axios from 'axios';
import { URLS } from '@constants/urls';
import { masterApi } from '@helpers/interceptors/master-data';
import {
  UpdateUnionReservedSeat,
  UpdateUnionReservedSeatResponseType,
} from '@type/election-declaration-management/main-list/union-reserved-seat/update-union-reserved-seat-types';

export const updateReserveUnionWard = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    data: UpdateUnionReservedSeat,
  ): Promise<{ data: UpdateUnionReservedSeatResponseType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await masterApi.put(
        URLS.UPDATE_UNION_RESERVED_WARD(data.id),
        {
          ...data,
        },
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
